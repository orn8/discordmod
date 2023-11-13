/**
 * @name Experiments
 * @author oragne
 * @authorId 1101637133850132572
 * @description Enables access to experiments and staff-only options for normal users.
 * @version 1.2.0
 * @source https://github.com/choco705/Experiments-BetterDiscord
 * @updateUrl https://raw.githubusercontent.com/choco705/Experiments-BetterDiscord/main/Experiments.plugin.js
 */

module.exports = class discordExperiments {
  start() {
    try {
      let c = window.webpackChunkdiscord_app.push([[Symbol()],{},({c})=>Object.values(c)]);
      let u = c.find((x)=> x?.exports?.default?.getUsers).exports.default;
      let m = Object.values(u._dispatcher._actionHandlers._dependencyGraph.nodes);
      u.getCurrentUser().flags |= 1;
      m.find((x)=>x.name === "DeveloperExperimentStore").actionHandler["CONNECTION_OPEN"]();
      try {m.find((x)=>x.name === "ExperimentStore").actionHandler["OVERLAY_INITIALIZE"]({user:{flags: 1}})} catch {}
      m.find((x)=>x.name === "ExperimentStore").storeDidChange()
    } catch (err) {
      console.log(err);
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
