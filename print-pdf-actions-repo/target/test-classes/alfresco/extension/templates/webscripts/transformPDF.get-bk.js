function main()
{
	model.transformation = "No";
	
  	var node = args["nodeRef"];
	var docNode = search.findNode(node);
	var nodeTrans = docNode;
	if(docNode.mimetype != 'application/pdf'){
		var docCopy = document.copy(userhome, true);
		var nodeTrans = docNode.transformDocument("application/pdf");
		model.transformation = "Si";
		nodeTrans.name = "PdfGeneratedForDeteleting";
	}
	
	model.pdfNodeRef = nodeTrans.nodeRef;
}
main();