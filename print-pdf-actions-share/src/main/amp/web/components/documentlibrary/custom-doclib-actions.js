(function () {
    YAHOO.Bubbling.fire("registerAction",
        {
            actionName: "onViewPrintablePDF",
            fn: function org_alfresco_training_onViewPrintablePDF(file) {
                this.modules.actions.genericAction(
                    {

                        success: {
                            callback: {
                                fn: function org_alfresco_training_onViewPrintablePDFSuccess(response) {
                                    Alfresco.util.PopupManager.displayPrompt(
                                        {
                                            title: this.msg("alfresco.tutorials.doclib.action.callWebScript.msg.success"),
                                            text: JSON.stringify(response.json),
                                            buttons: [
                                                {
                                                    text: this.msg("button.ok"),
                                                    handler: function org_alfresco_training_onViewPrintablePDFSuccess_success_ok() {
                                                        this.destroy();
                                                    },
                                                    isDefault: true
                                                },
                                                {
                                                    text: this.msg("button.cancel"),
                                                    handler: function org_alfresco_training_onViewPrintablePDFSuccess_cancel() {
                                                        this.destroy();
                                                    }
                                                }]
                                        });

                                },
                                scope: this
                            }
                        },
                        failure: {
                            message: this.msg("alfresco.tutorials.doclib.action.callWebScript.msg.failure",
                                file.displayName, Alfresco.constants.USERNAME)
                        },
                        webscript: {
                            name: "sample/fileinfo?nodeRef={nodeRef}",
                            stem: Alfresco.constants.PROXY_URI,
                            method: Alfresco.util.Ajax.GET,
                            params: {
                                nodeRef: file.nodeRef
                            }
                        },
                        config: {}
                    });
            }
        });
})();