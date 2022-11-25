sap.ui.define([
    "skoda/skoleni/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "skoda/skoleni/model/formatter",
    "sap/m/Dialog",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, formatter, Dialog, MessageToast, MessageBox, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("skoda.skoleni.controller.Main", {
            formatter: formatter,
            onInit: function () {
                this.getView().addStyleClass(this.getDensity());
            },
            

            getJSONEntry: function () {
                return {
                    jmeno: "",
                    auto: "",
                    model: "",
                    boural: false,
                    hodnoceni: 1
                }
            },
            handleButtonPress: function (oEvent) {
                var oButton = oEvent.getSource();
                var sText = oButton.getText();
                MessageToast.show("Klikl jsem na " + sText)
            },
            handleOpenNewDialog: function () {
                //starší zápis
                if (!this.oDialog) {
                    this.oDialog = sap.ui.xmlfragment("skoda.skoleni.view.fragment.NewEntryDialog", this);
                    this.getView().addDependent(this.oDialog);
                    this.oDialog.addStyleClass(this.getDensity())
                }
                this.oDialog.open();

                /*
                 //nejnovější zápis  
                 if(!this.oDialog){              
                 this.oDialog = this.loadFragment({ name: "skoda.skoleni.view.fragment.NewEntryDialog" });
                 this.oDialog.then(function (this.oDialog) {
                 }
                 }*/

                /*
                 var oDialog = new Dialog({
                     title: "Dialog z controlleru",
                 });               
                 oDialog.open();*/
            },
            handleAfterOpenNewEntryDialog: function () {
                var oEntryModel = new JSONModel();
                oEntryModel.setData(this.getJSONEntry());
                this.getView().setModel(oEntryModel, "entryModel");
            },
            handleCloseNewEntryDialog: function () {
                this.oDialog.close();
            },
            handleAddNewEntry: function () {
                if (!this.validateNewEntry()) return;
                var oNewEntry = this.getView().getModel("entryModel").getData();
                var oData = this.getView().getModel("mainModel").getData();
                oData.push(oNewEntry);
                this.getView().getModel("mainModel").setProperty("/", oData);
                this.handleCloseNewEntryDialog();
                this.refreshTableEntriesCount(oData.length);
            },
            validateNewEntry: function () {
                var oData = this.getView().getModel("entryModel").getData();
                if (oData.jmeno === "" || oData.model === "" || oData.auto === "") {
                    MessageBox.error("Prosím vyplňte všechna povinná pole")
                    return false;
                }
                return true;
            },
            refreshTableEntriesCount: function (iCount) {
                var oTitle = this.getView().byId("idTableTitle");
                oTitle.setText("Počet záznamů (" + iCount + ")");
            },
            handleDeleteEntry: function (oEvent) {
                var oButton = oEvent.getSource();
                var oColumnListItem = oButton.getParent();
                var sPath = oColumnListItem.getBindingContextPath();
                var iIndex = sPath.replace("/", "")
                this.deleteEntry(iIndex, 1);
            },
            handleDeleteAllEntries: function () {
                var oTable = this.getView().byId("idTable");
                var oSelectedItems = oTable.getSelectedItems();
                var oData = this.getView().getModel("mainModel").getData();
                for (let i = 0; i < oSelectedItems.length; i++) {
                    var sPath = oSelectedItems[i].getBindingContextPath();
                    var iIndex = sPath.replace("/", "")
                    this.deleteEntry(iIndex, 1);
                }

            },
            deleteEntry: function (iIndex, iNumber) {
                var oData = this.getView().getModel("mainModel").getData();
                oData.splice(iIndex, iNumber);
                this.getView().getModel("mainModel").setProperty("/", oData);
                this.refreshTableEntriesCount(oData.length);
            },
            handleOpenDetail: function (oEvent) {
                var oColumnListItem = oEvent.getSource();
                var sPath = oColumnListItem.getBindingContextPath();
                var iIndex = sPath.replace("/","");
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteDetail",{index: iIndex});
            },
            onSearch: function (oEvent) {
                // add filter for search
                var aFilters = [];
                var sQuery = oEvent.getSource().getValue();
                if (sQuery && sQuery.length > 0) {
                    var filter = new Filter("jmeno", FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }
                else{
                    MessageToast.show("Prosím zadejte validní text");
                }
                // update list binding
                var oList = this.byId("idTable");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilters, "Application");
            },
        });
    });
