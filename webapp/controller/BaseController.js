sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/Device"
    ],
    function(BaseController, Device) {
      "use strict";
  
      return BaseController.extend("skoda.skoleni.controller.BaseController", {
        getDensity: function(){
            //var oDeviceData = this.getView().getModel("device").getData();
            if(Device.support.touch){
                return "sapUiSizeCozy"
            }
            else{
                return "sapUiSizeCompact";
            }
        }   
      });
    }
  );
  