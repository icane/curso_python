define("dataLayerManager",["dataLayerHelper","dataLayerPageInfo","dataLayerUserInfo","dataLayerProductInfo","dataLayerUtils","dataLayerInternalCampaignInfo","dataLayerApplicationInfo"],function(t,e,a,r,i,n,o){"use strict";var s,c,l=i.detect$BFirstNameSpace("dataLayerTime")||3e3;function p(e,a){var r=t.getDigitalData();$.when(function(t,e,a){for(var r=e.split("."),i=r.length-1,n=0;n<i;)t=t[r[n]],n++;t[r[n]]=a.toString()}(r,e,a)).then(t.setDigitalData(r))}return{setProperties:function(c,l){var p=t.getDigitalData(c)||{};t.cleanDigitalData.call(p),l&&l.model&&l.model.attributes&&i.detectProduct(l.model.attributes)&&(s=l.model.attributes),"object"==typeof p&&"undefined"!=typeof $B?$.when(e.setPageInfo(p,l),a.setUserInfo(p,l),r.setProductInfo(p,s),n.setInternalCampaignInfo(p,l),o.setDataLayerApplicationInfo(p,l)).then(function(e){t.setDigitalData(e)}):t.setDigitalData(p)},setProperty:p,setEvent:t.eventInfo,getDigitalData:t.getDigitalData,setDigitalData:t.setDigitalData,setRoute:function(e){c&&e!==c&&(s="",t.cleanEvInfo()),c=e,i.cleanSearchResults(),i.cleanTmplError()},setSearchResults:function(t){var e=i.setSearchResults(t);e.word&&(p("page.pageActivity.search.onSiteSearchTerm",e.word),p("page.pageActivity.search.onSiteSearchResults",e.results),p("page.pageActivity.search.originalPage",e.page))},detectTransition:i.detectTransition,dataLayerTimer:l,setTmplError:function(t){"string"==typeof t?i.setTmplError(t):"object"==typeof t&&(t.descripcion||t.descripcion[0])&&("string"==typeof t.descripcion?i.setTmplError(t.descripcion):i.setTmplError(t.descripcion[0]))}}});