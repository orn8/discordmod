/**
 * @name Experiments
 * @author oragne
 * @authorId 1101637133850132572
 * @description Enables access to experiments and staff-only options for normal users.
 * @version 1.2.8
 * @source https://github.com/orn8/discordmod
 * @updateUrl https://raw.githubusercontent.com/orn8/discordmod/main/betterdiscord/plugins/Experiments.plugin.js
 */

module.exports = class discordExperiments {
  start() {
    BdApi.showToast("Experiments v1.2.8 Active", { type: "info", icon: true, timeout: 5000, forceShow: true });

    try {
      let module;
      webpackChunkdiscord_app.push([
        [Math.random()],
        {},
        (e) => {
          if (e.b !== undefined) {
            module = Object.values(e.c).find(
              (x) => x?.exports?.default?.getUsers && x.exports.default._dispatcher?._actionHandlers
            )?.exports?.default;
          }
        }
      ]);

      if (!module) throw new Error("Failed to locate required module.");

      const dispatcherNodes = Object.values(module._dispatcher._actionHandlers._dependencyGraph.nodes);

      // Try to trigger ExperimentStore initialisation
      try {
        dispatcherNodes.find((x) => x.name === "ExperimentStore")
          ?.actionHandler?.["OVERLAY_INITIALIZE"]?.({ user: { flags: 1 } });
      } catch (e) {
        console.warn("ExperimentStore OVERLAY_INITIALIZE failed:", e);
      }

      // Temporarily spoof staff status
      const originalMethods = [module.getCurrentUser, module.getNonImpersonatedCurrentUser];
      module.getCurrentUser = module.getNonImpersonatedCurrentUser = () => ({
        isStaff: () => true
      });

      // Trigger developer experiment initialisation
      dispatcherNodes.find((x) => x.name === "DeveloperExperimentStore")
        ?.actionHandler?.["OVERLAY_INITIALIZE"]?.();

      // Restore original user methods
      [module.getCurrentUser, module.getNonImpersonatedCurrentUser] = originalMethods;

    } catch (err) {
      console.error("Experiments Error:", err);
      BdApi.showNotice(`Experiments Error: ${err.message}`, {
        type: "error",
        buttons: [
          {
            label: "Report",
            onClick: () => window.open("https://github.com/orn8/discordmod/issues", "_blank")
          }
        ]
      });
    }
  }

  stop() {
    BdApi.showNotice("You must reboot Discord when disabling Experiments.", {
      type: "warning",
      buttons: [
        {
          label: "Reboot Discord",
          onClick: () => location.reload()
        }
      ]
    });
  }
};
