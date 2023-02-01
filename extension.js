/* Original code by matt vogel */
  /* v1  */
let mobile = false;
let sidebarBtnClasses = ['rm-left-sidebar__daily-notes',
                        'rm-left-sidebar__graph-overview',
                        'rm-left-sidebar__all-pages',
                        'rm-left-sidebar__roam-depot',
                        'starred-pages-wrapper .title']

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



async function onload({extensionAPI}) {
  // set default setting
  if (window.roamAlphaAPI.platform.isMobileApp||window.roamAlphaAPI.platform.isMobile||window.roamAlphaAPI.platform.isTouchDevice||window.roamAlphaAPI.platform.isIOS){
    mobile = true;
  }else{
    mobile = false
  }

  for (let i = 0; i < sidebarBtnClasses.length; i++) {

    if (!extensionAPI.settings.get(sidebarBtnClasses[i])) {
      await extensionAPI.settings.set(sidebarBtnClasses[i], false);
    } else if (extensionAPI.settings.get(sidebarBtnClasses[i])==true){
      // when starting up check if we should only hide on mobile
      if (extensionAPI.settings.get("mobile")==true) {
        if(mobile==true){
          hideButton(sidebarBtnClasses[i])
        }
      } else{
        hideButton(sidebarBtnClasses[i])
      }
    }
  }

  const panelConfig = {
    tabTitle: "Hide Left Sidebar Buttons",
    settings: [
      {
            id: "mobile",
            name: "Platform Toggle",
            description: "Turn on to only hide items on Mobile, leave off for all platforms",
            action: {
                type: "switch",
                onChange: (evt) => { 
                  if (evt.target.checked) {
                    console.log("hide only on mobile")
                    if (mobile) {
                      sidebarBtnClasses.forEach(function(button) {
                        // check the api for if we want to hide the button
                        if (extensionAPI.settings.get(button)) {
                          hideButton(button)
                        }
                      })
                    } else {
                      // we want to only hide on mobile but it's not mobile
                      sidebarBtnClasses.forEach(function(button) {
                        showButton(button)
                      })
                    }
                  } else {
                    console.log("hide everywhere")
                    sidebarBtnClasses.forEach(function(button) {
                      // check the api for if we want to hide the button
                      if (extensionAPI.settings.get(button)) {
                        hideButton(button)
                      }
                    })
                  }
                  
                }
            },
        },
        {id:         "rm-left-sidebar__daily-notes",
        name:        "Hide Daily Notes Button",
        description: "Hides or shows the Graph Overview button in the left sidebar",
        action:      {type:     "switch",
                      onChange: (evt) => { 
                        // check if we are hiding on mobile and if it's mobile
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
                      }}},
        {id:          "rm-left-sidebar__roam-depot",
        name:        "Hide Shortcuts Title Header",
        description: "Hides or shows the Shortcuts title header in the left sidebar",
        action:      {type:     "switch",
                      onChange: (evt) => { 
                        toggleButton(evt.target.checked, 'starred-pages-wrapper .title')
                      }}}

    ]
  };

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