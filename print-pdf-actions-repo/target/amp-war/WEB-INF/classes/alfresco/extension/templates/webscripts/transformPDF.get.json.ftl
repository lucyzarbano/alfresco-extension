<#assign datetimeformat="EEE, dd MMM yyyy HH:mm:ss zzz">
<#if pdfNodeRef??>
{ 
	"pdfNodeRef"          : "${pdfNodeRef.nodeRef}"
}
<#else>
{ 
	"pdfNodeRef"          : "null"
}
</#if>