sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], 
    /**
     * provide app-view type models (as in the first "V" in MVVC)
     * 
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.Device} Device
     * 
     * @returns {Function} createDeviceModel() for providing runtime info for the device the UI5 app is running on
     */
    function (JSONModel, Device) {
        "use strict";

        return {
            createDeviceModel: function () {
                var oModel = new JSONModel(Device);
                oModel.setDefaultBindingMode("OneWay");
                return oModel;
        },
        createJSONDummyModel: function(){
            var oJSONModel = new JSONModel();
                oJSONModel.setData(this.initJSONData());
                return oJSONModel;
        },
        
        initJSONData: function () {
            var oData = [{
                jmeno: "Petr",
                auto: "Škoda",
                model: "Karoq",
                boural: false,
                hodnoceni: 3,
                karoserie: "SUV"
            }, {
                jmeno: "Kateřina",
                auto: "Škoda",
                model: "Superb",
                boural: true,
                hodnoceni: 4,
                karoserie: "Kombi"
            }, {
                jmeno: "Lukáš",
                auto: "Mercedes",
                model: "S300",
                boural: false,
                hodnoceni: 4,
                karoserie: "Kombi"
            }, {
                jmeno: "Marcela",
                auto: "BMW",
                model: "X6",
                boural: false,
                hodnoceni: 3,
                karoserie: "SUV"
            }, {
                jmeno: "Jakub",
                auto: "Renault",
                model: "Laguna",
                boural: false,
                hodnoceni: 5,
                karoserie: "Coupe"
            }, {
                jmeno: "Pavel",
                auto: "Škoda",
                model: "Fabia",
                boural: false,
                hodnoceni: 2,
                karoserie: "Hatchback"
            }, {
                jmeno: "Martin",
                auto: "BMW",
                model: "e46",
                boural: false,
                hodnoceni: 5,
                karoserie: "Coupe"
            }, {
                jmeno: "Lukas",
                auto: "Škoda",
                model: "Favorit",
                boural: false,
                hodnoceni: 3,
                karoserie: "Kombi"
            }]

            return oData;
        },
    };
});