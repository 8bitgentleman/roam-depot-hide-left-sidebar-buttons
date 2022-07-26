/* Original code by matt vogel */
  /* v1  */
let sidebarBtnClasses = ['bp3-icon-calendar', 'bp3-icon-graph', 'bp3-icon-list', 'bp3-icon-shop']

// select parent button by child icon
function selectButton(buttonClass){
  let icon = document.querySelector(".roam-sidebar-content ." + buttonClass);
  let div = icon.parentNode;
  // some buttons (daily notes, graph) have a different html structure
  if (div.className != 'log-button'){
    div = div.parentNode
  }
  return div;
}

function hideButton(buttonClass){
  let btn = selectButton(buttonClass);
  btn.style.display = "none";
}

function showButton(buttonClass){
  let btn = selectButton(buttonClass);
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
        {id:         "bp3-icon-calendar",
        name:        "Hide Daily Notes Button",
        description: "Hides or shows the Graph Overview button in the left sidebar",
        action:      {type:     "switch",
                      onChange: (evt) => { 
                        toggleButton(evt.target.checked, 'bp3-icon-calendar')
                    }}},
        {id:          "bp3-icon-graph",
         name:        "Hide Graph Button",
         description: "Hides or shows the Graph Overview button in the left sidebar",
         action:      {type:     "switch",
                       onChange: (evt) => { 
                        toggleButton(evt.target.checked, 'bp3-icon-graph')
                      }}},
        {id:          "bp3-icon-list",
        name:        "Hide All Pages Button",
        description: "Hides or shows the Roam Depot button in the left sidebar",
        action:      {type:     "switch",
                      onChange: (evt) => { 
                        toggleButton(evt.target.checked, 'bp3-icon-list')
                      }}},
        {id:          "bp3-icon-shop",
        name:        "Hide Roam Depot Button",
        description: "Hides or shows the Roam Depot button in the left sidebar",
        action:      {type:     "switch",
                      onChange: (evt) => { 
                        toggleButton(evt.target.checked, 'bp3-icon-shop')
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