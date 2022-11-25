sap.ui.define([], 
    function () {
        "use strict";

        return {
            showActionButtons: function(sAuto){
                if(sAuto === "Škoda"){
                    return false;
                }
                else{
                    return true;
                }
            },
            showRating: function(sName, sAuto, sModel){
                if(sName === "Marcela" && sAuto === "BMW" && sModel === "X6"){
                    return false;
                }
                else{
                    return true;
                }
            },
            showIconsOnly: function(bIsDesktop, sText){
                if(bIsDesktop){
                    return sText;
                }
                    return "";
            },
            showIconForBodyType: function(sBody){
                switch(sBody){
                    case "Kombi":                        
                      // code block
                      return "sap-icon://insurance-car";
                    case "SUV":
                      // code block
                        return "sap-icon://collision";
                    case "Coupe":
                            // code block
                        return "sap-icon://performance";                      
                    default:
                      // code block
                      return "sap-icon://car-rental";
                  }
            }
    };
}); 