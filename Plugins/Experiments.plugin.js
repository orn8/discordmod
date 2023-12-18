/**
 * @name Experiments
 * @author oragne
 * @authorId 1101637133850132572
 * @description Enables access to experiments and staff-only options for normal users.
 * @version 1.2.3
 * @source https://github.com/orn8/BetterDiscord
 * @updateUrl https://raw.githubusercontent.com/orn8/Experiments-BetterDiscord/main/Plugins/Experiments.plugin.js
 */

module.exports = class discordExperiments {
  start() {
    BdApi.showToast("Experiments v1.2.3 Active", {type:"info",icon: true,timeout: 5000,forceShow: true});
    try {
      // START
      let cache; webpackChunkdiscord_app.push([["wp_isdev_patch"], {}, r => cache=r.c]);
      var UserStore = Object.values(cache).find(m => m?.exports?.default?.getUsers).exports.default;
      var actions = Object.values(UserStore._dispatcher._actionHandlers._dependencyGraph.nodes);
      var user = UserStore.getCurrentUser();
      actions.find(n => n.name === "ExperimentStore").actionHandler.CONNECTION_OPEN({
      	type: "CONNECTION_OPEN", user: {flags: user.flags |= 1}, experiments: [],
      });
      actions.find(n => n.name === "DeveloperExperimentStore").actionHandler.CONNECTION_OPEN();
      webpackChunkdiscord_app.pop(); user.flags &= ~1; "done";
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
              onClick: () => window.open("https://github.com/choco705/Experiments-BetterDiscord/issues", "mozillaTab")
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
