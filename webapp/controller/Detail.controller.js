sap.ui.define(
    [
        "skoda/skoleni/controller/BaseController",
        "sap/ui/model/json/JSONModel",
    ],
    function(BaseController, JSONModel) {
      "use strict";
  
      return BaseController.extend("skoda.skoleni.controller.Detail", {
          onInit: function(){
            this.getView().addStyleClass(this.getDensity());
            this.initDetailModel();
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteDetail").attachPatternMatched(this.patternMatched, this);
          },
          patternMatched: function(oEvent){
            var iIndex = oEvent.getParameter("arguments").index;
            this.getView().bindElement({
                path: "/" + iIndex,
                model: "mainModel"
            });
          },
        handleGoBackToMainView: function(oEvent){
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteMain");
        },
        handleToggleEditMode: function(){
            var bEditMode = this.getView().getModel("detailModel").getProperty("/editMode");
            this.getView().getModel("detailModel").setProperty("/editMode", !bEditMode);
        },
        initDetailModel: function(){
            var oData = {
                editMode: false,
                cars: [{
                    text: "Škoda",
                    key: "Škoda"
                },{
                    text: "Mercedes",
                    key: "Mercedes"
                },{
                    text: "BMW",
                    key: "BMW"
                },{
                    text: "Hyundai",
                    key: "Hyundai"
                },{
                    text: "Opel",
                    key: "Opel"
                },]
            }
            var oJSONModel = new JSONModel();
                oJSONModel.setData(oData);
                this.getView().setModel(oJSONModel, "detailModel");
        },
      });
    }
  );
  