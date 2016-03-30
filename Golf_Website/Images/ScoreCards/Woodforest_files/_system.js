function updateParent(newURL) {
	opener.window.focus();
	opener.document.location = newURL;
}

function focusThis() {
	focus();
}

function changetoParent(newURL) {
	opener.window.focus();
	opener.document.location = newURL;
	window.close();
}

function DoConfirm(message) {
	return confirm(message);
}

function OpenWindow(theURL,winName,features) { //v2.0
	var winheight = screen.height;
	var winwidth = screen.width;
	
	NewWindow=window.open(theURL,winName,features);
}

function OpenWindowAutoSize(theURL,winName,features) {
	var winheight = screen.height;
	var winwidth = screen.width;

	if (winwidth <= 640) {
		var wheight = 350;
		var wwidth = 600;
	}
	else if (winwidth <= 800) {
		var wheight = 500;
		var wwidth = 700;
	}
	else if (winwidth <= 1024) {
		var wheight = 726;
		var wwidth = 1000;
	}
	else if (winwidth <= 1600) {
		var wheight = 1120;
		var wwidth = 1580;
	}
	else {
		var wheight = 500;
		var wwidth = 700;
	}
	
	NewWindow=window.open(theURL,winName,'height=' + wheight + ',width=' + wwidth + ',' + features);
}  

function FocusonBox(w) {
	w.focus();
}

function swapImgRestore() { //v3.0
	var i,x,a=document.sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function findObj(n, d) { //v3.0
	var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
		d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);
	}

	if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
	for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=findObj(n,d.layers[i].document); return x;
}

function swapImage() { //v3.0
	var i,j=0,x,a=swapImage.arguments; document.sr=new Array; for(i=0;i<(a.length-2);i+=3)
	if ((x=findObj(a[i]))!=null){document.sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

//Social Network Links
pwidth = 700;
pheight = 400;
leftvar = ((screen.width - pwidth) / 2);
topvar = ((screen.height - pheight) / 2);

function doSNLink(url) {
	OpenWindow(url,'ssnet','toolbar=0,scrollbars=0,location=0,statusbar=1,menubar=1,resizable=1,width=' + pwidth + ',height=' + pheight + ',left=' + leftvar + ',top=' + topvar + '');
}
