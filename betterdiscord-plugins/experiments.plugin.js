/**
 * @name Experiments
 * @author oragne
 * @authorId 1101637133850132572
 * @description Enables access to experiments and staff-only options for normal users.
 * @version 1.2.6
 * @source https://github.com/orn8/discordmod
 * @updateUrl https://raw.githubusercontent.com/orn8/discordmod/main/betterdiscord-plugins/experiments.plugin.js
 */

module.exports = class discordExperiments {
  start() {
    BdApi.showToast("Experiments v1.2.6 Active", {type:"info",icon: true,timeout: 5000,forceShow: true});
    try {
      // START
      CurrentUser.flags |= 1;
      const Stores = Object.values(UserStore._dispatcher._actionHandlers._dependencyGraph.nodes);
      Stores.find((x) => x.name === "DeveloperExperimentStore").actionHandler["CONNECTION_OPEN"]();
      try { Stores.find((x) => x.name === "ExperimentStore").actionHandler["OVERLAY_INITIALIZE"]({ user: { flags: 1 } }); } catch {}
      Stores.find((x) => x.name === "ExperimentStore").storeDidChange(); 
      // END
    } catch (err) {
      console.log(err);
      BdApi.showNotice(
        `Experiments Error: ${err}`,
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
      buttons: [{
        label: "Reboot Discord",
        onClick: () => location.reload()
      }]
    });
  }
}
