/* Original code by matt vogel */
  /* v1  */
let mobile = false;
let sidebarBtnClasses = ['rm-left-sidebar__daily-notes',
                        'rm-left-sidebar__graph-overview',
                        'rm-left-sidebar__all-pages',
                        'rm-left-sidebar__roam-depot',
                        'starred_title']

function hideButton(buttonClass){
  let btn = document.querySelector(".roam-sidebar-content ." + buttonClass);
  btn.style.display = "none";
}

function showButton(buttonClass){
  let btn = document.querySelector(".roam-sidebar-content ." + buttonClass);
  btn.style.display = null;
}

async function onload({extensionAPI}) {
  // set default setting
  if (window.roamAlphaAPI.platform.isMobileApp||window.roamAlphaAPI.platform.isMobile||window.roamAlphaAPI.platform.isTouchDevice||window.roamAlphaAPI.platform.isIOS){
    mobile = true;
  }else{
    mobile = false
  }

  sidebarBtnClasses.forEach(async sidebarBtnClass => {
    // there needs to be a difference between the class to hide and the settings ID
    // now that I query for a more complex html item
    let classToHide;
    if (sidebarBtnClass=="starred_title") {
      classToHide=="starred-pages-wrapper .title"
    } else {
      classToHide = sidebarBtnClass;
    }

    if (!extensionAPI.settings.get(sidebarBtnClass)) {
      await extensionAPI.settings.set(sidebarBtnClass, false);
    } else if (extensionAPI.settings.get(sidebarBtnClass) == true) {
      // when starting up check if we should only hide on mobile
      if (extensionAPI.settings.get("mobile") == true) {
        // hide on mobile is true
        if (mobile == true) {
          hideButton(classToHide);
        }
      } else {
        // hide on mobile is false
        hideButton(classToHide);
      }
    }
  });
  
  function toggleButton(checked, btnClass){
    // check is on
      // only mobile
        // device is mobile
          // hide
      // wherever
        // hide 
    if (checked==true){
      if (extensionAPI.settings.get('mobile')==true) {
        if (mobile) {
          hideButton(btnClass)
        }
      } else{
        hideButton(btnClass)
      }
      
    } else if (checked==false){
      showButton(btnClass)
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
                      sidebarBtnClasses.forEach( sidebarBtnClass => {
                        // there needs to be a difference between the class to hide and the settings ID
                        // now that I query for a more complex html item
                        let classToHide;
                        if (sidebarBtnClass=="starred_title") {
                          classToHide=="starred-pages-wrapper .title"
                        } else {
                          classToHide = sidebarBtnClass;
                        }
                        if (extensionAPI.settings.get(sidebarBtnClass)) {
                          hideButton(classToHide)
                        }
                      })

                    } else {
                      // we want to only hide on mobile but it's not mobile
                      // so we show all buttons
                      sidebarBtnClasses.forEach( sidebarBtnClass => {
                        // there needs to be a difference between the class to hide and the settings ID
                        // now that I query for a more complex html item
                        let classToHide;
                        if (sidebarBtnClass=="starred_title") {
                          classToHide=="starred-pages-wrapper .title"
                        } else {
                          classToHide = sidebarBtnClass;
                        }
                        showButton(classToHide)
                      })
  
                    }
                  } else {
                    console.log("hide everywhere")
                    // check the api for if we want to hide the button
                    sidebarBtnClasses.forEach( sidebarBtnClass => {
                      // there needs to be a difference between the class to hide and the settings ID
                      // now that I query for a more complex html item
                      let classToHide;
                      if (sidebarBtnClass=="starred_title") {
                        classToHide=="starred-pages-wrapper .title"
                      } else {
                        classToHide = sidebarBtnClass;
                      }
                      if (extensionAPI.settings.get(sidebarBtnClass)) {
                        hideButton(classToHide)
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
  // reshow buttons
  sidebarBtnClasses.forEach( sidebarBtnClass => {
    let classToHide;
    if (sidebarBtnClass=="starred_title") {
      classToHide=="starred-pages-wrapper .title"
    } else {
      classToHide = sidebarBtnClass;
    }
    
    showButton(classToHide)
  })

  console.log("unload hide left sidebar button plugin")
}

export default {
  onload,
  onunload
};