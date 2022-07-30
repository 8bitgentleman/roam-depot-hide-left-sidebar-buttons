/* Original code by matt vogel */
  /* v1  */
let sidebarBtnClasses = ['rm-left-sidebar__daily-notes',
                        'rm-left-sidebar__graph-overview',
                        'rm-left-sidebar__all-pages',
                        'rm-left-sidebar__roam-depot']

function hideButton(buttonClass){
  let btn = document.querySelector(".roam-sidebar-content ." + buttonClass);
  btn.style.display = "none";
}

function showButton(buttonClass){
  let btn = document.querySelector(".roam-sidebar-content ." + buttonClass);
  btn.style.display = null;
}

function toggleButton(checked, btnClass){
  if (checked==true){
    hideButton(btnClass)
  } else if (checked==false){
    showButton(btnClass)
  } 
}

const panelConfig = {
    tabTitle: "Hide Left Sidebar Buttons",
    settings: [
        {id:         "rm-left-sidebar__daily-notes",
        name:        "Hide Daily Notes Button",
        description: "Hides or shows the Graph Overview button in the left sidebar",
        action:      {type:     "switch",
                      onChange: (evt) => { 
                        toggleButton(evt.target.checked, 'rm-left-sidebar__daily-notes')
                    }}},
        {id:          "rm-left-sidebar__graph-overview",
         name:        "Hide Graph Button",
         description: "Hides or shows the Graph Overview button in the left sidebar",
         action:      {type:     "switch",
                       onChange: (evt) => { 
                        toggleButton(evt.target.checked, 'rm-left-sidebar__graph-overview')
                      }}},
        {id:          "rm-left-sidebar__all-pages",
        name:        "Hide All Pages Button",
        description: "Hides or shows the Roam Depot button in the left sidebar",
        action:      {type:     "switch",
                      onChange: (evt) => { 
                        toggleButton(evt.target.checked, 'rm-left-sidebar__all-pages')
                      }}},
        {id:          "rm-left-sidebar__roam-depot",
        name:        "Hide Roam Depot Button",
        description: "Hides or shows the Roam Depot button in the left sidebar",
        action:      {type:     "switch",
                      onChange: (evt) => { 
                        toggleButton(evt.target.checked, 'rm-left-sidebar__roam-depot')
                      }}}
    ]
};

async function onload({extensionAPI}) {
  // set default setting
  for (let i = 0; i < sidebarBtnClasses.length; i++) {

    if (!extensionAPI.settings.get(sidebarBtnClasses[i])) {
      await extensionAPI.settings.set(sidebarBtnClasses[i], false);
    } else if (extensionAPI.settings.get(sidebarBtnClasses[i])==true){
      hideButton(sidebarBtnClasses[i])
    }
  }

  console.log("load hide left sidebar button plugin")
  extensionAPI.settings.panel.create(panelConfig);
}

function onunload() {
  console.log("unload hide left sidebar button plugin")
  // reshow buttons
  for (let i = 0; i < sidebarBtnClasses.length; i++) {
    showButton(sidebarBtnClasses[i]);
  }
}

export default {
  onload,
  onunload
};