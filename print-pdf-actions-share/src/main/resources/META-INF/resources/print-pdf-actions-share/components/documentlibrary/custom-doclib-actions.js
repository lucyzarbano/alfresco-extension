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
                                    var pdfNodeRef = response.json.pdfNodeRef;                    				
                    				
                    				if(pdfNodeRef != "null"){
                   						pdfNodeRef = pdfNodeRef.replace("://", "/");
                    					window.open(Alfresco.constants.PROXY_URI+ "slingshot/node/content/" + pdfNodeRef);
                    				} else alert(this.msg("message.print-pdf.failure",
                                file.displayName, Alfresco.constants.USERNAME));

                                },
                                scope: this
                            }
                        },
                        failure: {
                            message: this.msg("message.print-pdf.failure",
                                file.displayName, Alfresco.constants.USERNAME)
                        },
                        webscript: {
                            name: "transformPDF/file?nodeRef={nodeRef}",
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