function main()
{
  	var node = args["nodeRef"];
	//se il noderef è nullo
	
	if(node == null){
		status.setCode(400, "I dati richiesti non sono stati forniti");
		status.setRedirect(true);
	} else {
		var docNode = search.findNode(node);
		//se il nodo esiste
		if(!docNode.exists()){
			status.code = 404;
			status.message = "Il documento non esiste!";
			status.redirect = true;
		} 
		else{ //file trovato
			try{	
				var nodeTrans = docNode;
			   	var nodePdf = null;
				nodeTrans.mimetype = "image/tiff";
				var renditionDefName = 'cm:myRendDefinition';
				var renderingEngineName = 'reformat';
				//CREATE RENDITION DEFINITION
				var renditionDef = renditionService.createRenditionDefinition(renditionDefName, renderingEngineName);
				renditionDef.parameters['mime-type'] = 'application/pdf';
				// Now execute this rendition definition
				renditionDef.execute(nodeTrans);
				var nodePdf = renditionService.render(nodeTrans, renditionDef);     
				//model.pdfNodeRef = nodeTrans.nodeRef;
				//model.pdfNodeRef = nodePdf.nodeRef;
				model.pdfNodeRef = nodePdf.nodeRef;}  
		
			catch(e){
				  logger.debug("La trasformazione per il nodo " + nodeTrans.name + " non può essere eseguita");
				  model.pdfNodeRef = null;
			   }
		}
	}
}		
main();