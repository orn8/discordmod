/**
 * @name Experiments
 * @author oragne
 * @authorId 1101637133850132572
 * @description Enables access to experiments and staff-only options for normal users.
 * @version 1.2.7
 * @source https://github.com/orn8/discordmod
 * @updateUrl https://raw.githubusercontent.com/orn8/discordmod/main/betterdiscord-plugins/experiments.plugin.js
 */

module.exports = class discordExperiments {
  start() {
    BdApi.showToast("Experiments v1.2.7 Active", { type: "info", icon: true, timeout: 5000, forceShow: true });
    try {
      let wpRequire;
      webpackChunkdiscord_app.push([
        [Math.random()],
        {},
        (req) => {
          wpRequire = req;
        }
      ]);
      
      if (!wpRequire) throw new Error("wpRequire could not be initialised.");
      
      const userModule = Object.values(wpRequire.c).find(
        (x) => x?.exports?.default?.getCurrentUser && x?.exports?.default?._dispatcher?._actionHandlers
      );
      
      if (!userModule) throw new Error("User module not found.");
      
      const user = userModule.exports.default;
      const modules = Object.values(user._dispatcher._actionHandlers._dependencyGraph.nodes);

      user.getCurrentUser().flags |= 1;
      
      const devExperimentStore = modules.find((x) => x.name === "DeveloperExperimentStore");
      if (devExperimentStore) devExperimentStore.actionHandler["CONNECTION_OPEN"]();
      
      const experimentStore = modules.find((x) => x.name === "ExperimentStore");
      if (experimentStore) {
        try {
          experimentStore.actionHandler["OVERLAY_INITIALIZE"]({ user: { flags: 1 } });
        } catch {}
        experimentStore.storeDidChange();
      }
    } catch (err) {
      console.error("Experiments Error:", err);
      BdApi.showNotice(
        `Experiments Error: ${err.message}`,
        {
          type: "error",
          buttons: [
            {
              label: "Report",
              onClick: () => window.open("https://github.com/orn8/discordmod/issues", "mozillaTab")
            }
          ]
        }
      );
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
}
