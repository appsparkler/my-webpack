define(['handlebars', 'handlebars.runtime', 'handlebarshelpers'], function(Handlebars) {

this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["promotionala"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "hidden";
  },"3":function(depth0,helpers,partials,data) {
  return "add20paddingbottom";
  },"5":function(depth0,helpers,partials,data) {
  var stack1, buffer = "      <div class=\"promotionala-relative\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.rfpForm : stack1), {"name":"if","hash":{},"fn":this.program(6, data),"inverse":this.program(17, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "      </div>\r\n";
},"6":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "         <a href=\"javascript:void(0)\" tabindex=\"-1\"\r\n               data-remote=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\"\r\n               data-toggle=\"modal\" data-backdrop=\"static\" data-target=\"#kpmgModal\"\r\n               data-modal-url=\"/etc/partials/kpmgpublic/rfpprocess/rfpprocess.html\" id=\"rfp-process-modal\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.imageConfigExists : stack1), {"name":"if","hash":{},"fn":this.program(7, data),"inverse":this.program(15, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "         </a>\r\n";
},"7":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, blockHelperMissing=helpers.blockHelperMissing, buffer = "                <picture>\r\n";
  stack1 = blockHelperMissing.call(depth0, lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.imageConfig : stack1), depth0), {"name":"hbs.promotionalA.imageConfig","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                </picture>\r\n\r\n";
},"8":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.isDesktop : depth0), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.program(11, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, (data && data.last), {"name":"if","hash":{},"fn":this.program(13, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"9":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                            <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web."
    + escapeExpression(lambda((depth0 != null ? depth0.imagewidth : depth0), depth0))
    + "."
    + escapeExpression(lambda((depth0 != null ? depth0.imageheight : depth0), depth0))
    + ".jpg\"\r\n                                media=\"screen  and (min-width: 641px) and (max-width: 9440px)\" >\r\n";
},"11":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                            <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web."
    + escapeExpression(lambda((depth0 != null ? depth0.imagewidth : depth0), depth0))
    + "."
    + escapeExpression(lambda((depth0 != null ? depth0.imageheight : depth0), depth0))
    + ".jpg\"\r\n                                media=\"screen  and (min-width: 0px) and (max-width: 640px)\" >\r\n";
},"13":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing;
  return "                            <img class=\"img-responsive\" src=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web."
    + escapeExpression(lambda((depth0 != null ? depth0.imagewidth : depth0), depth0))
    + "."
    + escapeExpression(lambda((depth0 != null ? depth0.imageheight : depth0), depth0))
    + ".jpg\" alt=\""
    + escapeExpression(((helper = (helper = helpers.imageAltText || (depth0 != null ? depth0.imageAltText : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"imageAltText","hash":{},"data":data}) : helper)))
    + "\" title=\""
    + escapeExpression(((helper = (helper = helpers.imageAltText || (depth0 != null ? depth0.imageAltText : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"imageAltText","hash":{},"data":data}) : helper)))
    + "\"/>\r\n";
},"15":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                <picture>\r\n                       <!--[if IE 9]><video style=\"display: none;\"><![endif]-->\r\n                       <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.512.341.jpg\" media=\"screen  and (min-width: 0px) and (max-width: 640px)\">\r\n                       <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.237.158.jpg\" media=\"screen  and (min-width: 641px) and (max-width: 9440px)\">\r\n                       <!--[if IE 9]></video><![endif]-->\r\n                       <img class=\"img-responsive\" src=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.237.158.jpg\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\" alt=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\">\r\n                </picture>\r\n";
},"17":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.contactForm : stack1), {"name":"if","hash":{},"fn":this.program(18, data),"inverse":this.program(31, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"18":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "            <a href=\"javascript:void(0)\" tabindex=\"-1\"\r\n                  data-remote=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\"\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.contactForm : stack1), {"name":"if","hash":{},"fn":this.program(19, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                  data-toggle=\"modal\" id=\"contact-form-modal\"\r\n                  data-backdrop=\"static\" data-keyboard=\"false\"\r\n                  data-target=\"#kpmgModal\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.imageConfigExists : stack1), {"name":"if","hash":{},"fn":this.program(21, data),"inverse":this.program(29, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </a>\r\n";
},"19":function(depth0,helpers,partials,data) {
  return "                  data-modal-url=\"/etc/partials/kpmgpublic/contact-form/contact-form.html\"\r\n                  id=\"contact-form-modal\"\r\n";
  },"21":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, blockHelperMissing=helpers.blockHelperMissing, buffer = "                   <picture>\r\n";
  stack1 = blockHelperMissing.call(depth0, lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.imageConfig : stack1), depth0), {"name":"hbs.promotionalA.imageConfig","hash":{},"fn":this.program(22, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                   </picture>\r\n";
},"22":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.isDesktop : depth0), {"name":"if","hash":{},"fn":this.program(23, data),"inverse":this.program(25, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, (data && data.last), {"name":"if","hash":{},"fn":this.program(27, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"23":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                               <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web."
    + escapeExpression(lambda((depth0 != null ? depth0.imagewidth : depth0), depth0))
    + "."
    + escapeExpression(lambda((depth0 != null ? depth0.imageheight : depth0), depth0))
    + ".jpg\"\r\n                                   media=\"screen  and (min-width: 641px) and (max-width: 9440px)\" >\r\n";
},"25":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                               <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web."
    + escapeExpression(lambda((depth0 != null ? depth0.imagewidth : depth0), depth0))
    + "."
    + escapeExpression(lambda((depth0 != null ? depth0.imageheight : depth0), depth0))
    + ".jpg\"\r\n                                   media=\"screen  and (min-width: 0px) and (max-width: 640px)\" >\r\n";
},"27":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing;
  return "                               <img class=\"img-responsive\" src=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web."
    + escapeExpression(lambda((depth0 != null ? depth0.imagewidth : depth0), depth0))
    + "."
    + escapeExpression(lambda((depth0 != null ? depth0.imageheight : depth0), depth0))
    + ".jpg\" alt=\""
    + escapeExpression(((helper = (helper = helpers.imageAltText || (depth0 != null ? depth0.imageAltText : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"imageAltText","hash":{},"data":data}) : helper)))
    + "\" title=\""
    + escapeExpression(((helper = (helper = helpers.imageAltText || (depth0 != null ? depth0.imageAltText : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"imageAltText","hash":{},"data":data}) : helper)))
    + "\"/>\r\n";
},"29":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                   <picture>\r\n                          <!--[if IE 9]><video style=\"display: none;\"><![endif]-->\r\n                          <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.512.341.jpg\" media=\"screen  and (min-width: 0px) and (max-width: 640px)\">\r\n                          <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.237.158.jpg\" media=\"screen  and (min-width: 641px) and (max-width: 9440px)\">\r\n                          <!--[if IE 9]></video><![endif]-->\r\n                          <img class=\"img-responsive\" src=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.237.158.jpg\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\" alt=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\">\r\n                   </picture>\r\n";
},"31":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "            <a href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.imageConfigExists : stack1), {"name":"if","hash":{},"fn":this.program(21, data),"inverse":this.program(29, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </a>\r\n";
},"33":function(depth0,helpers,partials,data) {
  var stack1, buffer = "         <!-- condition to display overlay -->\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.overlay : stack1), {"name":"if","hash":{},"fn":this.program(34, data),"inverse":this.program(39, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"34":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.rfpForm : stack1), {"name":"if","hash":{},"fn":this.program(35, data),"inverse":this.program(37, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"35":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <a href=\"javascript:void(0)\" tabindex=\"0\"\r\n                  data-remote=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "\"\r\n                  data-toggle=\"modal\" data-backdrop=\"static\" data-target=\"#kpmgModal\"\r\n                  data-modal-url=\"/etc/partials/kpmgpublic/rfpprocess/rfpprocess.html\" id=\"rfp-process-modal\">\r\n               <h3 class=\"tertiary-head line-clamp line-clamp-3\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "</h3>\r\n            </a>\r\n";
},"37":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "            <a href=\"javascript:void(0)\" tabindex=\"-1\"\r\n                  data-remote=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\"\r\n                  title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "\"\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.contactForm : stack1), {"name":"if","hash":{},"fn":this.program(19, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                  data-toggle=\"modal\"\r\n                  data-backdrop=\"static\" data-keyboard=\"false\"\r\n                  data-target=\"#kpmgModal\">\r\n               <h3 class=\"tertiary-head line-clamp line-clamp-3\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "</h3>\r\n            </a>\r\n";
},"39":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "         <a href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\">\r\n             <h3 class=\"tertiary-head\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "</h3>\r\n         </a>\r\n";
},"41":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.rfpForm : stack1), {"name":"if","hash":{},"fn":this.program(42, data),"inverse":this.program(44, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n";
},"42":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "              <a href=\"javascript:void(0)\" tabindex=\"0\"\r\n                  title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\"\r\n                  data-remote=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\"\r\n                  data-toggle=\"modal\" data-backdrop=\"static\" data-target=\"#kpmgModal\"\r\n                  data-modal-url=\"/etc/partials/kpmgpublic/rfpprocess/rfpprocess.html\" id=\"rfp-process-modal\">\r\n                  <p class=\"tertiary-desc line-clamp line-clamp-5\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.shortDescription : stack1), depth0))
    + "</p>\r\n              </a>\r\n";
},"44":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.contactForm : stack1), {"name":"if","hash":{},"fn":this.program(45, data),"inverse":this.program(47, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"45":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                  <a href=\"javascript:void(0)\" tabindex=\"-1\"\r\n                            title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\"\r\n                            data-remote=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\"\r\n                            data-modal-url=\"/etc/partials/kpmgpublic/contact-form/contact-form.html\"\r\n                            data-toggle=\"modal\"\r\n                            data-backdrop=\"static\"\r\n                            data-target=\"#kpmgModal\" id=\"contact-form-modal\">\r\n                      <p class=\"tertiary-desc line-clamp line-clamp-5\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.shortDescription : stack1), depth0))
    + "</p>\r\n                  </a>\r\n";
},"47":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                  <a href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\">\r\n                      <p class=\"tertiary-desc\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.shortDescription : stack1), depth0))
    + "</p>\r\n                  </a>\r\n";
},"49":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "      <div class=\"library-desktop ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.isBlog : stack1), {"name":"if","hash":{},"fn":this.program(50, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\r\n         <div class=\"module-addtolibrary component self-contained clearfix\" aria-label=\"add to Library\" data-description=\"";
  stack1 = lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.longDescription : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-shortDescription=\"";
  stack1 = lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.shareDescription : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" data-image=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "\" data-title=\"";
  stack1 = lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.shortTitle : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\" data-shortTitle=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "\" tabindex=\"0\" article =\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.externalLink : stack1), depth0))
    + "\" style=\"display:none;\" data-article-type=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.articleType : stack1), depth0))
    + "\">\r\n            <a href=\"javascript:;\" class=\"addtolibrary-cta\" data-backdrop=\"static\" data-keyboard=\"false\" data-modal-url=\"\" data-remote=\"\" id=\"addToLibrary\" tabindex=\"0\" title=\"Add to library\" aria-haspopup=\"true\">\r\n               <span class=\"icon-star\"></span>\r\n            </a>\r\n         </div>\r\n      </div>\r\n      <div class=\"primary-cta-space\">&nbsp;</div>\r\n";
},"50":function(depth0,helpers,partials,data) {
  return " hidden";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<section class=\"module-promotionala component component-trackable\" personalize=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.personalized : stack1), depth0))
    + "\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.personalized : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " no-of-results-required=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.numberOfContents : stack1), depth0))
    + "\" article =\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.externalLink : stack1), depth0))
    + "\" tabindex=\"0\">\r\n   <div class=\"bg-white ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.secondaryLabel : stack1), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.imageFileReference : stack1), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "      <div>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.shortTitle : stack1), {"name":"if","hash":{},"fn":this.program(33, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.shortDescription : stack1), {"name":"if","hash":{},"fn":this.program(41, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalA : stack1)) != null ? stack1.externalLink : stack1), {"name":"if","hash":{},"fn":this.program(49, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "      </div>\r\n   </div>\r\n</section>\r\n";
},"useData":true});



this["Handlebars"]["templates"]["promotionalb"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "hidden";
  },"3":function(depth0,helpers,partials,data) {
  return "add20paddingbottom";
  },"5":function(depth0,helpers,partials,data) {
  var stack1, buffer = "      <div class=\"promotionalb-relative\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.rfpForm : stack1), {"name":"if","hash":{},"fn":this.program(6, data),"inverse":this.program(17, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "      </div>\r\n";
},"6":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "         <a href=\"javascript:void(0)\" tabindex=\"-1\"\r\n               data-remote=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\"\r\n               data-toggle=\"modal\" data-backdrop=\"static\" data-target=\"#kpmgModal\"\r\n               data-modal-url=\"/etc/partials/kpmgpublic/rfpprocess/rfpprocess.html\" id=\"rfp-process-modal\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.imageConfigExists : stack1), {"name":"if","hash":{},"fn":this.program(7, data),"inverse":this.program(15, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "         </a>\r\n";
},"7":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, blockHelperMissing=helpers.blockHelperMissing, buffer = "                <picture>\r\n";
  stack1 = blockHelperMissing.call(depth0, lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.imageConfig : stack1), depth0), {"name":"hbs.promotionalB.imageConfig","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                </picture>\r\n";
},"8":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.isDesktop : depth0), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.program(11, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, (data && data.last), {"name":"if","hash":{},"fn":this.program(13, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"9":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                            <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web."
    + escapeExpression(lambda((depth0 != null ? depth0.imagewidth : depth0), depth0))
    + "."
    + escapeExpression(lambda((depth0 != null ? depth0.imageheight : depth0), depth0))
    + ".jpg\"\r\n                                media=\"screen  and (min-width: 641px) and (max-width: 9440px)\" >\r\n";
},"11":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                            <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web."
    + escapeExpression(lambda((depth0 != null ? depth0.imagewidth : depth0), depth0))
    + "."
    + escapeExpression(lambda((depth0 != null ? depth0.imageheight : depth0), depth0))
    + ".jpg\"\r\n                                media=\"screen  and (min-width: 0px) and (max-width: 640px)\" >\r\n";
},"13":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                            <img class=\"img-responsive\" src=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web."
    + escapeExpression(lambda((depth0 != null ? depth0.imagewidth : depth0), depth0))
    + "."
    + escapeExpression(lambda((depth0 != null ? depth0.imageheight : depth0), depth0))
    + ".jpg\" alt=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\"/>\r\n";
},"15":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                <picture>\r\n                       <!--[if IE 9]><video style=\"display: none;\"><![endif]-->\r\n                       <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.512.341.jpg\" media=\"screen  and (min-width: 0px) and (max-width: 640px)\">\r\n                       <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.512.203.jpg\" media=\"screen  and (min-width: 641px) and (max-width: 9440px)\">\r\n                       <!--[if IE 9]></video><![endif]-->\r\n                       <img class=\"img-responsive\" src=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.512.203.jpg\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\" alt=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\">\r\n                </picture>\r\n";
},"17":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.contactForm : stack1), {"name":"if","hash":{},"fn":this.program(18, data),"inverse":this.program(31, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"18":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "            <a href=\"javascript:void(0)\" tabindex=\"-1\"\r\n                  data-remote=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\"\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.contactForm : stack1), {"name":"if","hash":{},"fn":this.program(19, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                  data-toggle=\"modal\" id=\"contact-form-modal\"\r\n                  data-backdrop=\"static\" data-keyboard=\"false\"\r\n                  data-target=\"#kpmgModal\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.imageConfigExists : stack1), {"name":"if","hash":{},"fn":this.program(21, data),"inverse":this.program(29, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </a>\r\n";
},"19":function(depth0,helpers,partials,data) {
  return "                  data-modal-url=\"/etc/partials/kpmgpublic/contact-form/contact-form.html\"\r\n                  id=\"contact-form-modal\"\r\n";
  },"21":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, blockHelperMissing=helpers.blockHelperMissing, buffer = "                   <picture>\r\n";
  stack1 = blockHelperMissing.call(depth0, lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.imageConfig : stack1), depth0), {"name":"hbs.promotionalB.imageConfig","hash":{},"fn":this.program(22, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                   </picture>\r\n";
},"22":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.isDesktop : depth0), {"name":"if","hash":{},"fn":this.program(23, data),"inverse":this.program(25, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, (data && data.last), {"name":"if","hash":{},"fn":this.program(27, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"23":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                               <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web."
    + escapeExpression(lambda((depth0 != null ? depth0.imagewidth : depth0), depth0))
    + "."
    + escapeExpression(lambda((depth0 != null ? depth0.imageheight : depth0), depth0))
    + ".jpg\"\r\n                                   media=\"screen  and (min-width: 641px) and (max-width: 9440px)\" >\r\n";
},"25":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                               <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web."
    + escapeExpression(lambda((depth0 != null ? depth0.imagewidth : depth0), depth0))
    + "."
    + escapeExpression(lambda((depth0 != null ? depth0.imageheight : depth0), depth0))
    + ".jpg\"\r\n                                   media=\"screen  and (min-width: 0px) and (max-width: 640px)\" >\r\n";
},"27":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                               <img class=\"img-responsive\" src=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web."
    + escapeExpression(lambda((depth0 != null ? depth0.imagewidth : depth0), depth0))
    + "."
    + escapeExpression(lambda((depth0 != null ? depth0.imageheight : depth0), depth0))
    + ".jpg\" alt=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\"/>\r\n";
},"29":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                   <picture>\r\n                          <!--[if IE 9]><video style=\"display: none;\"><![endif]-->\r\n                          <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.512.341.jpg\" media=\"screen  and (min-width: 0px) and (max-width: 640px)\">\r\n                          <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.512.203.jpg\" media=\"screen  and (min-width: 641px) and (max-width: 9440px)\">\r\n                          <!--[if IE 9]></video><![endif]-->\r\n                          <img class=\"img-responsive\" src=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.512.203.jpg\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\" alt=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\">\r\n                   </picture>\r\n";
},"31":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "            <a href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.imageConfigExists : stack1), {"name":"if","hash":{},"fn":this.program(21, data),"inverse":this.program(32, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "           </a>\r\n";
},"32":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.enableThreeColumn : stack1), {"name":"if","hash":{},"fn":this.program(33, data),"inverse":this.program(35, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"33":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                   <picture>\r\n                          <!--[if IE 9]><video style=\"display: none;\"><![endif]-->\r\n                          <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.512.341.jpg\" media=\"screen  and (min-width: 0px) and (max-width: 640px)\">\r\n                          <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.1082.378.jpg\" media=\"screen  and (min-width: 641px) and (max-width: 9440px)\">\r\n                          <!--[if IE 9]></video><![endif]-->\r\n                          <img class=\"img-responsive\" src=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.1082.378.jpg\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\" alt=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\">\r\n                   </picture>\r\n";
},"35":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    <picture>\r\n                          <!--[if IE 9]><video style=\"display: none;\"><![endif]-->\r\n                          <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.512.341.jpg\" media=\"screen  and (min-width: 0px) and (max-width: 640px)\">\r\n                          <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.512.203.jpg\" media=\"screen  and (min-width: 641px) and (max-width: 9440px)\">\r\n                          <!--[if IE 9]></video><![endif]-->\r\n                          <img class=\"img-responsive\" src=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.512.203.jpg\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\" alt=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\">\r\n                   </picture>\r\n";
},"37":function(depth0,helpers,partials,data) {
  var stack1, buffer = "         <!-- condition to open title as overlay -->\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.overlay : stack1), {"name":"if","hash":{},"fn":this.program(38, data),"inverse":this.program(43, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"38":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.rfpForm : stack1), {"name":"if","hash":{},"fn":this.program(39, data),"inverse":this.program(41, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"39":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <a href=\"javascript:void(0)\" tabindex=\"-1\"\r\n                  data-remote=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.title : stack1), depth0))
    + "\"\r\n                  data-toggle=\"modal\" data-backdrop=\"static\" data-target=\"#kpmgModal\"\r\n                  data-modal-url=\"/etc/partials/kpmgpublic/rfpprocess/rfpprocess.html\" id=\"rfp-process-modal\">\r\n               <h3 class=\"tertiary-head line-clamp line-clamp-3\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.title : stack1), depth0))
    + "</h3>\r\n            </a>\r\n";
},"41":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "            <a href=\"javascript:void(0)\" tabindex=\"-1\"\r\n                  data-remote=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\"\r\n                  title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.title : stack1), depth0))
    + "\"\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.contactForm : stack1), {"name":"if","hash":{},"fn":this.program(19, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                  data-toggle=\"modal\"\r\n                  data-backdrop=\"static\" data-keyboard=\"false\"\r\n                  data-target=\"#kpmgModal\">\r\n               <h3 class=\"tertiary-head line-clamp line-clamp-3\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.title : stack1), depth0))
    + "</h3>\r\n            </a>\r\n";
},"43":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "         <a href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\">\r\n             <h3 class=\"tertiary-head\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.title : stack1), depth0))
    + "</h3>\r\n         </a>\r\n";
},"45":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.rfpForm : stack1), {"name":"if","hash":{},"fn":this.program(46, data),"inverse":this.program(48, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n";
},"46":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "              <a title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\"\r\n                  href=\"javascript:void(0)\" tabindex=\"-1\"\r\n                        data-remote=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\"\r\n                        data-toggle=\"modal\" data-backdrop=\"static\" data-target=\"#kpmgModal\"\r\n                        data-modal-url=\"/etc/partials/kpmgpublic/rfpprocess/rfpprocess.html\" id=\"rfp-process-modal\">\r\n                  <p class=\"description line-clamp line-clamp-4\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.longDescription : stack1), depth0))
    + "</p>\r\n              </a>\r\n";
},"48":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.contactForm : stack1), {"name":"if","hash":{},"fn":this.program(49, data),"inverse":this.program(51, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"49":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                  <a title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\"\r\n                      href=\"javascript:void(0)\" tabindex=\"-1\"\r\n                            data-remote=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\"\r\n                            data-toggle=\"modal\" data-backdrop=\"static\" data-target=\"#kpmgModal\"\r\n                            data-modal-url=\"/etc/partials/kpmgpublic/contact-form/contact-form.html\" id=\"contact-form-modal\">\r\n                      <p class=\"description line-clamp line-clamp-4\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.longDescription : stack1), depth0))
    + "</p>\r\n                  </a>\r\n";
},"51":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                  <a href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\">\r\n                      <p class=\"description\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.longDescription : stack1), depth0))
    + "</p>\r\n                  </a>\r\n";
},"53":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "      <div class=\"library-desktop ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.isBlog : stack1), {"name":"if","hash":{},"fn":this.program(54, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\r\n         <div class=\"module-addtolibrary component self-contained clearfix\" aria-label=\"add to Library\" data-description=\"";
  stack1 = lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.longDescription : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-shortDescription=\"";
  stack1 = lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.shareDescription : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" data-image=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "\" data-title=\"";
  stack1 = lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.shortTitle : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\" data-shortTitle=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "\" tabindex=\"0\" article =\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.externalLink : stack1), depth0))
    + "\" style=\"display:none;\" data-article-type=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.articleType : stack1), depth0))
    + "\">\r\n            <a href=\"#\" class=\"addtolibrary-cta\" data-backdrop=\"static\" data-keyboard=\"false\" data-modal-url=\"\" data-remote=\"\" id=\"addToLibrary\" title=\"Add to library\" tabindex=\"0\" aria-haspopup=\"true\">\r\n               <span class=\"icon-star\"></span>\r\n            </a>\r\n         </div>\r\n      </div>\r\n      <div class=\"primary-cta-space\">&nbsp;</div>\r\n";
},"54":function(depth0,helpers,partials,data) {
  return " hidden";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<section class=\"module-promotionalb component component-trackable\" personalize=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.personalized : stack1), depth0))
    + "\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.personalized : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " no-of-results-required=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.numberOfContents : stack1), depth0))
    + "\" article =\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.externalLink : stack1), depth0))
    + "\" tabindex=\"0\">\r\n   <div class=\"promotionalb-container clearfix ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.secondaryUrl : stack1), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.imageFileReference : stack1), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.title : stack1), {"name":"if","hash":{},"fn":this.program(37, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.longDescription : stack1), {"name":"if","hash":{},"fn":this.program(45, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalB : stack1)) != null ? stack1.externalLink : stack1), {"name":"if","hash":{},"fn":this.program(53, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "   </div>\r\n</section>\r\n";
},"useData":true});



this["Handlebars"]["templates"]["promotionalc"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "hidden";
  },"3":function(depth0,helpers,partials,data) {
  return "add20paddingbottom";
  },"5":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.numberOfContents : stack1), {"name":"if","hash":{},"fn":this.program(6, data),"inverse":this.program(8, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"6":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.eventLabel : stack1), {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"8":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.eventLabel : stack1), depth0))
    + "\r\n";
},"10":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.rfpForm : stack1), {"name":"if","hash":{},"fn":this.program(11, data),"inverse":this.program(13, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"11":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        <a tabindex=\"-1\" href=\"javascript:void(0)\"\r\n        data-remote=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "\"\r\n        data-toggle=\"modal\" data-backdrop=\"static\" data-target=\"#kpmgModal\"\r\n        data-modal-url=\"/etc/partials/kpmgpublic/rfpprocess/rfpprocess.html\" id=\"rfp-process-modal\">\r\n        <h4 class=\"alt-tertiary-head line-clamp line-clamp-3\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "</h4>\r\n    </a>\r\n";
},"13":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.contactForm : stack1), {"name":"if","hash":{},"fn":this.program(14, data),"inverse":this.program(17, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"14":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "    <a tabindex=\"-1\" href=\"javascript:void(0)\"\r\n    data-remote=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\"\r\n    title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "\"\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.contactForm : stack1), {"name":"if","hash":{},"fn":this.program(15, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    data-toggle=\"modal\" data-target=\"#kpmgModal\">\r\n    <h4 class=\"alt-tertiary-head line-clamp line-clamp-3\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "</h4>\r\n</a>\r\n";
},"15":function(depth0,helpers,partials,data) {
  return "    data-modal-url=\"/etc/partials/kpmgpublic/contact-form/contact-form.html\"\r\n    id=\"contact-form-modal\"\r\n";
  },"17":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<a href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "\">\r\n    <h4 class=\"alt-tertiary-head line-clamp line-clamp-3\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "</h4>\r\n</a>\r\n";
},"19":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.liveTextDay : stack1), {"name":"if","hash":{},"fn":this.program(20, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"20":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<a href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "\">\r\n    <div class=\"promotionalc-event-date\">\r\n        <div class=\"promotionalc-event-calendar\">\r\n            <div class=\"promotionalc-event-icon\">\r\n                <div class=\"promotionalc-event-month\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.liveTextMonth : stack1), depth0))
    + "</div>\r\n                <span class=\"icon-date\"></span>\r\n                <div class=\"promotionalc-event-day\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.liveTextDay : stack1), depth0))
    + "</div>\r\n            </div>\r\n        </div>\r\n        <ul class=\"promotionalc-event-address\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.eventDuration : stack1), {"name":"if","hash":{},"fn":this.program(21, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.eventVenue : stack1), {"name":"if","hash":{},"fn":this.program(23, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.eventCity : stack1), {"name":"if","hash":{},"fn":this.program(25, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.eventState : stack1), {"name":"if","hash":{},"fn":this.program(30, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "            </li>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.eventCountry : stack1), {"name":"if","hash":{},"fn":this.program(32, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        </ul>\r\n    </div>\r\n</a>\r\n";
},"21":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <li>"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.eventDuration : stack1), depth0))
    + "</li>\r\n";
},"23":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <li>"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.eventVenue : stack1), depth0))
    + "</li>\r\n";
},"25":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.eventState : stack1), {"name":"if","hash":{},"fn":this.program(26, data),"inverse":this.program(28, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"26":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <li>"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.eventCity : stack1), depth0))
    + ",\r\n";
},"28":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.eventCity : stack1), depth0))
    + "</li>\r\n";
},"30":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                <li>"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.eventState : stack1), depth0))
    + "</li>\r\n";
},"32":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <li>"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.eventCountry : stack1), depth0))
    + "</li>\r\n";
},"34":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.rfpForm : stack1), {"name":"if","hash":{},"fn":this.program(35, data),"inverse":this.program(37, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"35":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        <a title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "\"\r\n            tabindex=\"-1\" href=\"javascript:void(0)\"\r\n            data-remote=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\"\r\n            data-toggle=\"modal\" data-backdrop=\"static\" data-target=\"#kpmgModal\"\r\n            data-modal-url=\"/etc/partials/kpmgpublic/rfpprocess/rfpprocess.html\" id=\"rfp-process-modal\">\r\n            <p class=\"desciption line-clamp line-clamp-5\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.shortDescription : stack1), depth0))
    + "</p>\r\n        </a>\r\n";
},"37":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.contactForm : stack1), {"name":"if","hash":{},"fn":this.program(38, data),"inverse":this.program(40, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"38":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <a title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "\"\r\n                tabindex=\"-1\" href=\"javascript:void(0)\"\r\n                data-remote=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\"\r\n                data-toggle=\"modal\" data-backdrop=\"static\" data-target=\"#kpmgModal\"\r\n                data-modal-url=\"/etc/partials/kpmgpublic/contact-form/contact-form.html\" id=\"contact-form-modal\">\r\n                <p class=\"desciption line-clamp line-clamp-5\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.shortDescription : stack1), depth0))
    + "</p>\r\n            </a>\r\n";
},"40":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <a href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "\">\r\n                <p class=\"desciption line-clamp line-clamp-5\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.shortDescription : stack1), depth0))
    + "</p>\r\n            </a>\r\n";
},"42":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<div class=\"library-desktop ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.isBlog : stack1), {"name":"if","hash":{},"fn":this.program(43, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\r\n    <div class=\"module-addtolibrary component self-contained clearfix\" aria-label=\"add to Library\" data-description=\"";
  stack1 = lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.longDescription : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-shortDescription=\"";
  stack1 = lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.shareDescription : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" data-image=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "\" data-title=\"";
  stack1 = lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.shortTitle : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\" data-shortTitle=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "\" article=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.externalLink : stack1), depth0))
    + "\" style=\"display:none;\" data-article-type=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.articleType : stack1), depth0))
    + "\">\r\n        <a href=\"#\" class=\"addtolibrary-cta\" data-backdrop=\"static\" data-keyboard=\"false\" data-modal-url=\"\" data-remote=\"\" id=\"addToLibrary\" tabindex=\"0\" title=\"Add to library\" aria-haspopup=\"true\">\r\n            <span class=\"icon-star\"></span>\r\n        </a>\r\n    </div>\r\n</div>\r\n<div class=\"primary-cta-space\">&nbsp;</div>\r\n";
},"43":function(depth0,helpers,partials,data) {
  return " hidden";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<section class=\"module-promotionalc component component-trackable\" personalize=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.personalized : stack1), depth0))
    + "\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.personalized : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " no-of-results-required=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.numberOfContents : stack1), depth0))
    + "\" article =\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.externalLink : stack1), depth0))
    + "\" tabindex=\"0\">\r\n    <div class=\"promotionalc-container clearfix ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.secondaryUrl : stack1), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\r\n        <a href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "\">\r\n            <h3 class=\"alt-secondary-head image-title \">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.personalized : stack1), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.program(6, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "            </h3>\r\n        </a>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.shortTitle : stack1), {"name":"if","hash":{},"fn":this.program(10, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.liveTextMonth : stack1), {"name":"if","hash":{},"fn":this.program(19, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.shortDescription : stack1), {"name":"if","hash":{},"fn":this.program(34, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalC : stack1)) != null ? stack1.externalLink : stack1), {"name":"if","hash":{},"fn":this.program(42, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\r\n</section>\r\n";
},"useData":true});



this["Handlebars"]["templates"]["promotionald"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "hidden";
  },"3":function(depth0,helpers,partials,data) {
  return " ";
  },"5":function(depth0,helpers,partials,data) {
  return " tool ";
  },"7":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.numberOfContents : stack1), {"name":"if","hash":{},"fn":this.program(8, data),"inverse":this.program(10, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"8":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.newsTitle : stack1), {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"10":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.title : stack1), depth0))
    + "\r\n";
},"12":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                    "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.newsTitle : stack1), {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"14":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.rfpForm : stack1), {"name":"if","hash":{},"fn":this.program(15, data),"inverse":this.program(17, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"15":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        <a tabindex=\"-1\" href=\"javascript:void(0)\"\r\n        data-remote=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "\"\r\n        data-toggle=\"modal\" data-backdrop=\"static\" data-target=\"#kpmgModal\"\r\n        data-modal-url=\"/etc/partials/kpmgpublic/rfpprocess/rfpprocess.html\" id=\"rfp-process-modal\">\r\n            <h3 class=\"alt-tertiary-head\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "</h3>\r\n        </a>\r\n";
},"17":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.contactForm : stack1), {"name":"if","hash":{},"fn":this.program(18, data),"inverse":this.program(21, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"18":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "    <a tabindex=\"-1\" href=\"javascript:void(0)\"\r\n    data-remote=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\"\r\n    title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "\"\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.contactForm : stack1), {"name":"if","hash":{},"fn":this.program(19, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    data-toggle=\"modal\"\r\n    data-backdrop=\"static\" data-keyboard=\"false\"\r\n    data-target=\"#kpmgModal\" id=\"contact-form-modal\">\r\n    <h3 class=\"alt-tertiary-head line-clamp line-clamp-3\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "</h3>\r\n    </a>\r\n";
},"19":function(depth0,helpers,partials,data) {
  return "    data-modal-url=\"/etc/partials/kpmgpublic/contact-form/contact-form.html\"\r\n    id=\"contact-form-modal\"\r\n";
  },"21":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "    <a href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "\">\r\n        <h3 class=\"alt-tertiary-head line-clamp line-clamp-3\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "</h3>\r\n    </a>\r\n";
},"23":function(depth0,helpers,partials,data) {
  var stack1, buffer = "\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.rfpForm : stack1), {"name":"if","hash":{},"fn":this.program(24, data),"inverse":this.program(26, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n";
},"24":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <a title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "\"\r\n                tabindex=\"-1\" href=\"javascript:void(0)\"\r\n                data-remote=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\"\r\n                data-toggle=\"modal\" data-backdrop=\"static\" data-target=\"#kpmgModal\"\r\n                data-modal-url=\"/etc/partials/kpmgpublic/rfpprocess/rfpprocess.html\" id=\"rfp-process-modal\">\r\n                <p class=\"promotionald-description line-clamp line-clamp-7\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.shortDescription : stack1), depth0))
    + "</p>\r\n            </a>\r\n";
},"26":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.contactForm : stack1), {"name":"if","hash":{},"fn":this.program(27, data),"inverse":this.program(29, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"27":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                <a title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "\"\r\n                    tabindex=\"-1\" href=\"javascript:void(0)\"\r\n                    data-remote=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\"\r\n                    data-toggle=\"modal\" data-backdrop=\"static\" data-target=\"#kpmgModal\"\r\n                    data-modal-url=\"/etc/partials/kpmgpublic/contact-form/contact-form.html\" id=\"contact-form-modal\">\r\n                    <p class=\"promotionald-description line-clamp line-clamp-7\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.shortDescription : stack1), depth0))
    + "</p>\r\n                </a>\r\n";
},"29":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                <a href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "\">\r\n                    <p class=\"promotionald-description line-clamp line-clamp-7\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.shortDescription : stack1), depth0))
    + "</p>\r\n                </a>\r\n";
},"31":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "    <div class=\"library-desktop ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.isBlog : stack1), {"name":"if","hash":{},"fn":this.program(32, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\r\n        <div class=\"module-addtolibrary component self-contained clearfix\" aria-label=\"add to Library\" data-description=\"";
  stack1 = lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.longDescription : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-shortDescription=\"";
  stack1 = lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.shareDescription : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" data-image=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "\" data-title=\"";
  stack1 = lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.shortTitle : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\" data-shortTitle=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "\" article =\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.externalLink : stack1), depth0))
    + "\" style=\"display:none;\">\r\n            <a href=\"#\" class=\"addtolibrary-cta\" data-backdrop=\"static\" data-keyboard=\"false\" data-modal-url=\"\" data-remote=\"\" id=\"addToLibrary\" tabindex=\"0\" title=\"Add to library\" aria-haspopup=\"true\">\r\n                <span class=\"icon-star\"></span>\r\n            </a>\r\n        </div>\r\n    </div>\r\n    <div class=\"primary-cta-space\">&nbsp;</div>\r\n";
},"32":function(depth0,helpers,partials,data) {
  return " hidden";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<section class=\"module-promotionald component\" personalize=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.personalized : stack1), depth0))
    + "\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.personalized : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " no-of-results-required=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.numberOfContents : stack1), depth0))
    + "\" article =\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.externalLink : stack1), depth0))
    + "\" tabindex=\"0\">\r\n    <div class=\"promotionald-container clearfix\">\r\n        <a href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "\">\r\n            <h3 class=\"alt-secondary-head ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.isNews : stack1), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.program(5, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " image-title\">\r\n                 <span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.personalized : stack1), {"name":"if","hash":{},"fn":this.program(7, data),"inverse":this.program(12, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                </span>\r\n            </h3>\r\n        </a>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.shortTitle : stack1), {"name":"if","hash":{},"fn":this.program(14, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.shortDescription : stack1), {"name":"if","hash":{},"fn":this.program(23, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalD : stack1)) != null ? stack1.externalLink : stack1), {"name":"if","hash":{},"fn":this.program(31, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\r\n</section>\r\n";
},"useData":true});



this["Handlebars"]["templates"]["promotionale"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "hidden";
  },"3":function(depth0,helpers,partials,data) {
  return "add20paddingbottom";
  },"5":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "               <a tabindex=\"-1\" href=\"javascript:void(0)\"\r\n                     data-remote=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\"\r\n                     data-toggle=\"modal\" data-backdrop=\"static\" data-target=\"#kpmgModal\"\r\n                     data-modal-url=\"/etc/partials/kpmgpublic/rfpprocess/rfpprocess.html\" id=\"rfp-process-modal\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.imageFileReference : stack1), {"name":"if","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "               </a>\r\n";
},"6":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.imageConfigExists : stack1), {"name":"if","hash":{},"fn":this.program(7, data),"inverse":this.program(15, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"7":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, blockHelperMissing=helpers.blockHelperMissing, buffer = "                         <picture>\r\n";
  stack1 = blockHelperMissing.call(depth0, lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.imageConfig : stack1), depth0), {"name":"hbs.promotionalE.imageConfig","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                         </picture>\r\n";
},"8":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.isDesktop : depth0), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.program(11, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, (data && data.last), {"name":"if","hash":{},"fn":this.program(13, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"9":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                                     <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web."
    + escapeExpression(lambda((depth0 != null ? depth0.imagewidth : depth0), depth0))
    + "."
    + escapeExpression(lambda((depth0 != null ? depth0.imageheight : depth0), depth0))
    + ".jpg\"\r\n                                         media=\"screen  and (min-width: 641px) and (max-width: 9440px)\" >\r\n";
},"11":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                                     <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web."
    + escapeExpression(lambda((depth0 != null ? depth0.imagewidth : depth0), depth0))
    + "."
    + escapeExpression(lambda((depth0 != null ? depth0.imageheight : depth0), depth0))
    + ".jpg\"\r\n                                         media=\"screen  and (min-width: 0px) and (max-width: 640px)\" >\r\n";
},"13":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing;
  return "                                     <img class=\"img-responsive\" src=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web."
    + escapeExpression(lambda((depth0 != null ? depth0.imagewidth : depth0), depth0))
    + "."
    + escapeExpression(lambda((depth0 != null ? depth0.imageheight : depth0), depth0))
    + ".jpg\" alt=\""
    + escapeExpression(((helper = (helper = helpers.imageAltText || (depth0 != null ? depth0.imageAltText : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"imageAltText","hash":{},"data":data}) : helper)))
    + "\" title=\""
    + escapeExpression(((helper = (helper = helpers.imageAltText || (depth0 != null ? depth0.imageAltText : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"imageAltText","hash":{},"data":data}) : helper)))
    + "\"/>\r\n";
},"15":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                         <picture>\r\n                                <!--[if IE 9]><video style=\"display: none;\"><![endif]-->\r\n                                <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.512.341.jpg\" media=\"screen  and (min-width: 0px) and (max-width: 640px)\">\r\n                                <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.237.158.jpg\" media=\"screen  and (min-width: 641px) and (max-width: 9440px)\">\r\n                                <!--[if IE 9]></video><![endif]-->\r\n                                <img class=\"img-responsive\" src=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.237.158.jpg\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\" alt=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\">\r\n                         </picture>\r\n";
},"17":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.contactForm : stack1), {"name":"if","hash":{},"fn":this.program(18, data),"inverse":this.program(32, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"18":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "                  <a tabindex=\"-1\" href=\"javascript:void(0)\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\"\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.contactForm : stack1), {"name":"if","hash":{},"fn":this.program(19, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                        href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" data-backdrop=\"static\" data-keyboard=\"false\" data-toggle=\"modal\" data-target=\"#kpmgModal\" >\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.imageFileReference : stack1), {"name":"if","hash":{},"fn":this.program(21, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                  </a>\r\n";
},"19":function(depth0,helpers,partials,data) {
  return "                        data-modal-url=\"/etc/partials/kpmgpublic/contact-form/contact-form.html\"\r\n                        id=\"contact-form-modal\"\r\n";
  },"21":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.imageConfigExists : stack1), {"name":"if","hash":{},"fn":this.program(22, data),"inverse":this.program(30, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"22":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, blockHelperMissing=helpers.blockHelperMissing, buffer = "                            <picture>\r\n";
  stack1 = blockHelperMissing.call(depth0, lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.imageConfig : stack1), depth0), {"name":"hbs.promotionalE.imageConfig","hash":{},"fn":this.program(23, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                            </picture>\r\n";
},"23":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.isDesktop : depth0), {"name":"if","hash":{},"fn":this.program(24, data),"inverse":this.program(26, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, (data && data.last), {"name":"if","hash":{},"fn":this.program(28, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"24":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                                        <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web."
    + escapeExpression(lambda((depth0 != null ? depth0.imagewidth : depth0), depth0))
    + "."
    + escapeExpression(lambda((depth0 != null ? depth0.imageheight : depth0), depth0))
    + ".jpg\"\r\n                                            media=\"screen  and (min-width: 641px) and (max-width: 9440px)\" >\r\n";
},"26":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                                        <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web."
    + escapeExpression(lambda((depth0 != null ? depth0.imagewidth : depth0), depth0))
    + "."
    + escapeExpression(lambda((depth0 != null ? depth0.imageheight : depth0), depth0))
    + ".jpg\"\r\n                                            media=\"screen  and (min-width: 0px) and (max-width: 640px)\" >\r\n";
},"28":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing;
  return "                                        <img class=\"img-responsive\" src=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web."
    + escapeExpression(lambda((depth0 != null ? depth0.imagewidth : depth0), depth0))
    + "."
    + escapeExpression(lambda((depth0 != null ? depth0.imageheight : depth0), depth0))
    + ".jpg\" alt=\""
    + escapeExpression(((helper = (helper = helpers.imageAltText || (depth0 != null ? depth0.imageAltText : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"imageAltText","hash":{},"data":data}) : helper)))
    + "\" title=\""
    + escapeExpression(((helper = (helper = helpers.imageAltText || (depth0 != null ? depth0.imageAltText : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"imageAltText","hash":{},"data":data}) : helper)))
    + "\"/>\r\n";
},"30":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                             <picture>\r\n                                    <!--[if IE 9]><video style=\"display: none;\"><![endif]-->\r\n                                    <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.512.341.jpg\" media=\"screen  and (min-width: 0px) and (max-width: 640px)\">\r\n                                    <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.237.158.jpg\" media=\"screen  and (min-width: 641px) and (max-width: 9440px)\">\r\n                                    <!--[if IE 9]></video><![endif]-->\r\n                                    <img class=\"img-responsive\" src=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.237.158.jpg\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\" alt=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\">\r\n                             </picture>\r\n";
},"32":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "                  <a href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.imageFileReference : stack1), {"name":"if","hash":{},"fn":this.program(33, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                </a>\r\n";
},"33":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.imageConfigExists : stack1), {"name":"if","hash":{},"fn":this.program(22, data),"inverse":this.program(34, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"34":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.enableThreeColumn : stack1), {"name":"if","hash":{},"fn":this.program(35, data),"inverse":this.program(30, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"35":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                            <picture>\r\n                                    <!--[if IE 9]><video style=\"display: none;\"><![endif]-->\r\n                                    <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.512.341.jpg\" media=\"screen  and (min-width: 0px) and (max-width: 640px)\">\r\n                                    <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.1082.378.jpg\" media=\"screen  and (min-width: 641px) and (max-width: 9440px)\">\r\n                                    <!--[if IE 9]></video><![endif]-->\r\n                                    <img class=\"img-responsive three-col\" src=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.1082.378.jpg\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\" alt=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\">\r\n                             </picture>\r\n";
},"37":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                  data-modal-url=\"/etc/partials/kpmgpublic/rfpprocess/rfpprocess.html\" id=\"rfp-process-modal\" href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" data-toggle=\"modal\" data-backdrop=\"static\" data-target=\"#kpmgModal\" data-keyboard=\"false\" tabindex=\"-1\"\r\n";
},"39":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.contactForm : stack1), {"name":"if","hash":{},"fn":this.program(40, data),"inverse":this.program(42, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                  ";
},"40":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                     data-modal-url=\"/etc/partials/kpmgpublic/contact-form/contact-form.html\" id=\"contact-form-modal\" href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" data-toggle=\"modal\" data-backdrop=\"static\" data-target=\"#kpmgModal\" data-keyboard=\"false\" tabindex=\"-1\"\r\n";
},"42":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                        href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\"\r\n";
},"44":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "              <a tabindex=\"-1\" href=\"javascript:void(0)\"\r\n                 data-remote=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\"\r\n                 data-toggle=\"modal\" data-backdrop=\"static\" data-target=\"#kpmgModal\"\r\n                 data-modal-url=\"/etc/partials/kpmgpublic/rfpprocess/rfpprocess.html\" id=\"rfp-process-modal\">\r\n                 <h2 class=\"title visible-lg-promoE\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.title : stack1), depth0))
    + "</h2>\r\n              </a>\r\n";
},"46":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.contactForm : stack1), {"name":"if","hash":{},"fn":this.program(47, data),"inverse":this.program(49, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"47":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                 <a tabindex=\"-1\" href=\"javascript:void(0)\" data-modal-url=\"/etc/partials/kpmgpublic/contact-form/contact-form.html\" id=\"contact-form-modal\" href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.title : stack1), depth0))
    + "\" data-backdrop=\"static\" data-keyboard=\"false\" data-toggle=\"modal\" data-target=\"#kpmgModal\" id=\"contact-form-modal\">\r\n                    <h2 class=\"title visible-lg-promoE\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.title : stack1), depth0))
    + "</h2>\r\n                 </a>\r\n";
},"49":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                  <a href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\">\r\n                    <h2 class=\"title visible-lg-promoE\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.title : stack1), depth0))
    + "</h2>\r\n                  </a>\r\n";
},"51":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "              <a tabindex=\"-1\" href=\"javascript:void(0)\"\r\n                 data-remote=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.title : stack1), depth0))
    + "\"\r\n                 data-toggle=\"modal\" data-backdrop=\"static\" data-target=\"#kpmgModal\"\r\n                 data-modal-url=\"/etc/partials/kpmgpublic/rfpprocess/rfpprocess.html\" id=\"rfp-process-modal\">\r\n                 <h2 class=\"title visible-sm-promoE\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.title : stack1), depth0))
    + "</h2>\r\n              </a>\r\n";
},"53":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.contactForm : stack1), {"name":"if","hash":{},"fn":this.program(54, data),"inverse":this.program(56, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"54":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                 <a tabindex=\"-1\" href=\"javascript:void(0)\"\r\n                    data-modal-url=\"/etc/partials/kpmgpublic/contact-form/contact-form.html\" id=\"contact-form-modal\"\r\n                    href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.title : stack1), depth0))
    + "\" data-backdrop=\"static\" data-keyboard=\"false\" data-toggle=\"modal\" data-target=\"#kpmgModal\" id=\"contact-form-modal\">\r\n                    <h2 class=\"title visible-sm-promoE\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.title : stack1), depth0))
    + "</h2>\r\n                 </a>\r\n";
},"56":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                <a href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\">\r\n                  <h2 class=\"title visible-sm-promoE\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.title : stack1), depth0))
    + "</h2>\r\n                </a>\r\n";
},"58":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "              <a title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\"\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.rfpForm : stack1), {"name":"if","hash":{},"fn":this.program(37, data),"inverse":this.program(59, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + ">\r\n                  <p class=\"promotional-content\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.longDescription : stack1), depth0))
    + "</p>\r\n              </a>\r\n";
},"59":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.contactForm : stack1), {"name":"if","hash":{},"fn":this.program(60, data),"inverse":this.program(62, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                   ";
},"60":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                      data-modal-url=\"/etc/partials/kpmgpublic/contact-form/contact-form.html\" id=\"contact-form-modal\" href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" data-toggle=\"modal\" data-backdrop=\"static\" data-target=\"#kpmgModal\" data-keyboard=\"false\" tabindex=\"-1\"\r\n";
},"62":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                     href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\"\r\n";
},"64":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "            <div class=\"library-desktop ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.isBlog : stack1), {"name":"if","hash":{},"fn":this.program(65, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\r\n                <div class=\"module-addtolibrary component self-contained clearfix\" aria-label=\"add to Library\" data-description=\"";
  stack1 = lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.longDescription : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-shortDescription=\"";
  stack1 = lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.shareDescription : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" data-image=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "\" data-title=\"";
  stack1 = lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.shortTitle : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\" data-shortTitle=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "\" tabindex=\"0\" article =\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.externalLink : stack1), depth0))
    + "\" style=\"display:none;\" data-article-type=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.articleType : stack1), depth0))
    + "\">\r\n                    <a href=\"#\" class=\"addtolibrary-cta\" data-backdrop=\"static\" data-keyboard=\"false\" data-modal-url=\"\" data-remote=\"\" id=\"addToLibrary\" title=\"Add to library\" tabindex=\"0\" aria-haspopup=\"true\">\r\n                    <span class=\"icon-star\"></span>\r\n                    </a>\r\n                </div>\r\n            </div>\r\n            <div class=\"primary-cta-space\">&nbsp;</div>\r\n";
},"65":function(depth0,helpers,partials,data) {
  return " hidden";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<section class=\"module-promotionale component component-trackable\" personalize=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.personalized : stack1), depth0))
    + "\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.personalized : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " no-of-results-required=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.numberOfContents : stack1), depth0))
    + "\" article =\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.externalLink : stack1), depth0))
    + "\" tabindex=\"0\">\r\n   <div class=\"clearfix ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.secondaryLabel : stack1), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\r\n      <div class=\"promotionale-container\">\r\n         <div class=\"promo-content\">\r\n            <div class=\"promotionale-imgcont\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.rfpForm : stack1), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.program(17, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "               <a title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\"\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.rfpForm : stack1), {"name":"if","hash":{},"fn":this.program(37, data),"inverse":this.program(39, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += ">\r\n                  <div class=\"promotionale-rectangle visible-lg-promoE\" tabindex=\"0\"></div>\r\n               </a>\r\n            </div>\r\n\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.rfpForm : stack1), {"name":"if","hash":{},"fn":this.program(44, data),"inverse":this.program(46, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.rfpForm : stack1), {"name":"if","hash":{},"fn":this.program(51, data),"inverse":this.program(53, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.longDescription : stack1), {"name":"if","hash":{},"fn":this.program(58, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "         </div>\r\n      </div>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotionalE : stack1)) != null ? stack1.externalLink : stack1), {"name":"if","hash":{},"fn":this.program(64, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "   </div>\r\n</section>\r\n";
},"useData":true});



this["Handlebars"]["templates"]["dashboardarticle"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return " hidden";
  },"3":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.addtolibrary : stack1), depth0))
    + "\"\r\n";
},"5":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            title=\""
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.sharedlist.addtolibrary", {"name":"i18n","hash":{},"data":data})))
    + "\"\r\n";
},"7":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                aria-label=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.addtolibrary : stack1), depth0))
    + "\"\r\n";
},"9":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                aria-label=\""
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.sharedlist.addtolibrary", {"name":"i18n","hash":{},"data":data})))
    + "\"\r\n";
},"11":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.addtolibrary : stack1), depth0))
    + "\"\r\n";
},"13":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                    title=\""
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.sharedlist.addtolibrary", {"name":"i18n","hash":{},"data":data})))
    + "\"\r\n";
},"15":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.refreshcontent : stack1), depth0))
    + "\"\r\n";
},"17":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            title=\""
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.dashboard.dashboardarticle.refreshcontent", {"name":"i18n","hash":{},"data":data})))
    + "\"\r\n";
},"19":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.showanotherarticle : stack1), depth0))
    + "\r\n";
},"21":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.dashboard.dashboardarticle.showanotherarticle", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"23":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.dontshowarticleagain : stack1), depth0))
    + "\r\n";
},"25":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.dashboard.dashboardarticle.dontshowarticleagain", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"27":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.updatemypreferences : stack1), depth0))
    + "\r\n";
},"29":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.dashboard.dashboardarticle.updatemypreferences", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"31":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.share : stack1), depth0))
    + "\"\r\n";
},"33":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            title=\""
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.librarylist.share", {"name":"i18n","hash":{},"data":data})))
    + "\"\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<section class=\"module-dashboardarticle component component-trackable\" hidden personalize=\"true\" no-of-results-required=\"1\" article=\"true\">\r\n    <a class=\"image-holder\" href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" tabindex=\"-1\">\r\n        <img class=\"img-responsive lazy\" alt=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.title : stack1), depth0))
    + "\" src=\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 237 158'%2F%3E\"\r\n            data-desktop=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.237.158.jpg\"\r\n            data-mobile=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.512.341.jpg\">\r\n    </a>\r\n    <a href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" class=\"title-link\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.title : stack1), depth0))
    + "\" tabindex=\"-1\">\r\n        <h3 class=\"tertiary-head line-clamp line-clamp-3\" tabindex=\"0\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.title : stack1), depth0))
    + "</h3>\r\n    </a>\r\n    <a href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" class=\"desc-link\" tabindex=\"-1\">\r\n        <p class=\"tertiary-desc line-clamp line-clamp-5\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.longDescription : stack1), depth0))
    + "</p>\r\n    </a>\r\n    <div class=\"library-desktop ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.isBlog : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\"\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.personalized : stack1), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.program(5, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        role=\"button\" tabindex=\"0\">\r\n        <div class=\"module-addtolibrary component self-contained clearfix\"\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.personalized : stack1), {"name":"if","hash":{},"fn":this.program(7, data),"inverse":this.program(9, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "            data-description=\"";
  stack1 = lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.longDescription : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-shortDescription=\"";
  stack1 = lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.shortDescription : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" data-image=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "\" data-title=\"";
  stack1 = lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.title : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-shortTitle=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "\"  data-article-type=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.articleType : stack1), depth0))
    + "\">\r\n                <a href=\"#\" class=\"addtolibrary-cta\" data-backdrop=\"static\" data-keyboard=\"false\" data-modal-url=\"\" data-remote=\"\" id=\"addToLibrary\" tabindex=\"0\"\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.personalized : stack1), {"name":"if","hash":{},"fn":this.program(11, data),"inverse":this.program(13, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                aria-haspopup=\"true\">\r\n                    <span class=\"icon-star\"></span>\r\n                </a>\r\n        </div>\r\n    </div>\r\n    <div class=\"content-refresh-cta\"\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.personalized : stack1), {"name":"if","hash":{},"fn":this.program(15, data),"inverse":this.program(17, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        data-url=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" role=\"button\" tabindex=\"0\">\r\n        <span class=\"icon-dots\"></span>\r\n    </div>\r\n    <div class=\"module-contentrefreshctas content-refresh-slider slide-down\">\r\n        <button class=\"refresh-article active cta-row\">\r\n            <span class=\"icon-refresh\"></span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.personalized : stack1), {"name":"if","hash":{},"fn":this.program(19, data),"inverse":this.program(21, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        </button>\r\n        <button class=\"hide-article active cta-row\">\r\n            <span class=\"icon-views\"></span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.personalized : stack1), {"name":"if","hash":{},"fn":this.program(23, data),"inverse":this.program(25, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        </button>\r\n        <a href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.myinterests : stack1), depth0))
    + "\" class=\"interests-link active cta-row\">\r\n            <span class=\"icon-sliders\"></span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.personalized : stack1), {"name":"if","hash":{},"fn":this.program(27, data),"inverse":this.program(29, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        </a>\r\n        <div class=\"ellipsis-cta\" tabindex=\"0\">\r\n            <span class=\"icon-dots\"></span>\r\n        </div>\r\n    </div>\r\n    <div class=\"indicator-share\"\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.personalized : stack1), {"name":"if","hash":{},"fn":this.program(31, data),"inverse":this.program(33, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        data-title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.title : stack1), depth0))
    + "\"\r\n        data-url=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" data-desc=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.longDescription : stack1), depth0))
    + "\"\r\n        data-image=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.dashboardarticle : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.237.158.jpg\" role=\"button\" tabindex=\"0\">\r\n        <span class=\"icon-share\"></span>\r\n    </div>\r\n\r\n</section>\r\n";
},"useData":true});



this["Handlebars"]["templates"]["featuredarticles"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "hidden";
  },"3":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.numberOfContents : stack1), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.program(6, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"4":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "		"
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.label : stack1), {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"6":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "		"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.label : stack1), depth0))
    + "\r\n";
},"8":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.imageConfigExists : stack1), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.program(13, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"9":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing, buffer = "			<div data-picture data-alt='"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.alt : stack1), depth0))
    + "'>\r\n";
  stack1 = blockHelperMissing.call(depth0, lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.imageConfig : stack1), depth0), {"name":"hbs.featuredArticles.imageConfig","hash":{},"fn":this.program(10, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "				</div>\r\n";
},"10":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "					<div data-src=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.imageUrl : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web."
    + escapeExpression(lambda((depth0 != null ? depth0.imagewidth : depth0), depth0))
    + "."
    + escapeExpression(lambda((depth0 != null ? depth0.imageheight : depth0), depth0))
    + ".jpg\" data-media=\"(min-width: "
    + escapeExpression(lambda((depth0 != null ? depth0.devicewidth : depth0), depth0))
    + "px)\"></div>\r\n";
  stack1 = helpers['if'].call(depth0, (data && data.last), {"name":"if","hash":{},"fn":this.program(11, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"11":function(depth0,helpers,partials,data) {
  var helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing;
  return "					<img class=\"img-responsive lazy\" src=\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 "
    + escapeExpression(lambda((depth0 != null ? depth0.imagewidth : depth0), depth0))
    + " "
    + escapeExpression(lambda((depth0 != null ? depth0.imageheight : depth0), depth0))
    + "'%2F%3E\" alt=\""
    + escapeExpression(((helper = (helper = helpers.imageAltText || (depth0 != null ? depth0.imageAltText : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"imageAltText","hash":{},"data":data}) : helper)))
    + "\" />\r\n";
},"13":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "			<img src=\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 237 158'%2F%3E\" data-mobile=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.imageUrl : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.512.341.jpg\" data-desktop=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.imageUrl : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.237.158.jpg\" alt=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.alt : stack1), depth0))
    + "\" class=\"img-responsive lazy\"/>\r\n";
},"15":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.numberOfContents : stack1), {"name":"if","hash":{},"fn":this.program(16, data),"inverse":this.program(18, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"16":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "			"
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.label : stack1), {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"18":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "			"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.label : stack1), depth0))
    + "\r\n";
},"20":function(depth0,helpers,partials,data) {
  return " hidden";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<section class=\"module-featuredarticles component\" personalize=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.personalized : stack1), depth0))
    + "\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.personalized : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " no-of-results-required=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.numberOfContents : stack1), depth0))
    + "\" tabindex=\"0\">\r\n<a class=\"cell-wraper\" href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.fpRfpButtonLink : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.alt : stack1), depth0))
    + "\">\r\n	<h4 class=\"visible-xs visible-sm alt-secondary-head\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.personalized : stack1), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.program(4, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "	</h4>\r\n	<div class=\"featuredarticles-data\">\r\n		<div class=\"featuredarticles-imgcont\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.imageUrl : stack1), {"name":"if","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "			<div class=\"featuredarticles-rectangle visible-lg\"></div>\r\n		</div>\r\n		<h4 class=\"visible-lg-FeatArticleHead alt-secondary-head\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.personalized : stack1), {"name":"if","hash":{},"fn":this.program(15, data),"inverse":this.program(16, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "		</h4>\r\n		<p class=\"title visible-lg-FeatArticle \">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.title : stack1), depth0))
    + "</p>\r\n		<p class=\"title visible-xs-FeatArticle\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "</p>\r\n	</div>\r\n	<div class=\"featuredarticles-rfp\">\r\n		<p class=\"visible-lg visible-sm visible-md-block featuredarticles-desc-desktop\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.description : stack1), depth0))
    + "</p>\r\n		<p class=\"visible-xs featuredarticles-desc-mobile\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.shortDescription : stack1), depth0))
    + "</p>\r\n	</div>\r\n</a>\r\n	<div class=\"library-desktop ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.isBlog : stack1), {"name":"if","hash":{},"fn":this.program(20, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\r\n      <div class=\"module-addtolibrary component self-contained clearfix\" aria-label=\"add to Library\" data-description=\"";
  stack1 = lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.description : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.fpRfpButtonLink : stack1), depth0))
    + "\" data-image=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.imageUrl : stack1), depth0))
    + "\" data-title=\"";
  stack1 = lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.title : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\" data-shortTitle=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "\" style=\"display:none;\" data-article-type=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.featuredArticles : stack1)) != null ? stack1.articleType : stack1), depth0))
    + "\">\r\n			<a href=\"#\" class=\"addtolibrary-cta\" data-backdrop=\"static\" data-keyboard=\"false\" data-modal-url=\"\" data-remote=\"\" id=\"addToLibrary\" tabindex=\"0\" aria-haspopup=\"true\" aria-label=\"add to Library\">\r\n				<span class=\"icon-star trackable\"></span>\r\n			</a>\r\n		</div>\r\n	</div>\r\n</section>\r\n";
},"useData":true});



this["Handlebars"]["templates"]["widedashboardarticle"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return " hidden";
  },"3":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.addtolibrary : stack1), depth0))
    + "\"\r\n";
},"5":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            title=\""
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.sharedlist.addtolibrary", {"name":"i18n","hash":{},"data":data})))
    + "\"\r\n";
},"7":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                aria-label=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.addtolibrary : stack1), depth0))
    + "\"\r\n";
},"9":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                aria-label=\""
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.sharedlist.addtolibrary", {"name":"i18n","hash":{},"data":data})))
    + "\"\r\n";
},"11":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.addtolibrary : stack1), depth0))
    + "\"\r\n";
},"13":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                    title=\""
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.sharedlist.addtolibrary", {"name":"i18n","hash":{},"data":data})))
    + "\"\r\n";
},"15":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.refreshcontent : stack1), depth0))
    + "\"\r\n";
},"17":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            title=\""
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.dashboard.dashboardarticle.refreshcontent", {"name":"i18n","hash":{},"data":data})))
    + "\"\r\n";
},"19":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.share : stack1), depth0))
    + "\"\r\n";
},"21":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            title=\""
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.librarylist.share", {"name":"i18n","hash":{},"data":data})))
    + "\"\r\n";
},"23":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.showanotherarticle : stack1), depth0))
    + "\r\n";
},"25":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.dashboard.dashboardarticle.showanotherarticle", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"27":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.dontshowarticleagain : stack1), depth0))
    + "\r\n";
},"29":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.dashboard.dashboardarticle.dontshowarticleagain", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"31":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.updatemypreferences : stack1), depth0))
    + "\r\n";
},"33":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.dashboard.dashboardarticle.updatemypreferences", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<section class=\"module-widedashboardarticle component component-trackable\" hidden personalize=\"true\" no-of-results-required=\"1\" tabindex=\"0\" article=\"true\">\r\n    <span class=\"hover-info-container\">\r\n        <a href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.title : stack1), depth0))
    + "\" tabindex=\"-1\">\r\n            <h3 class=\"tertiary-head line-clamp line-clamp-3\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.title : stack1), depth0))
    + "</h3>\r\n        </a>\r\n        <a href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" class=\"article-desc-link\" tabindex=\"-1\">\r\n            <p class=\"tertiary-desc line-clamp line-clamp-5\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.longDescription : stack1), depth0))
    + "</p>\r\n        </a>\r\n    </span>\r\n    <a class=\"image-holder\" href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" tabindex=\"-1\">\r\n        <img class=\"img-responsive lazy\" alt=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.title : stack1), depth0))
    + "\" src=\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 512 341'%2F%3E\"\r\n            data-desktop=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.512.341.jpg\"\r\n            data-mobile=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.512.341.jpg\">\r\n    </a>\r\n    <div class=\"library-desktop ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.isBlog : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\"\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.personalized : stack1), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.program(5, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        role=\"button\" tabindex=\"0\">\r\n        <div class=\"module-addtolibrary component self-contained clearfix\"\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.personalized : stack1), {"name":"if","hash":{},"fn":this.program(7, data),"inverse":this.program(9, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "            data-description=\"";
  stack1 = lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.longDescription : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-shortDescription=\"";
  stack1 = lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.shortDescription : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" data-image=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "\" data-title=\"";
  stack1 = lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.title : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-shortTitle=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "\" data-article-type=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.articleType : stack1), depth0))
    + "\">\r\n            <a href=\"#\" class=\"addtolibrary-cta\" data-backdrop=\"static\" data-keyboard=\"false\" data-modal-url=\"\" data-remote=\"\" id=\"addToLibrary\" tabindex=\"0\"\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.personalized : stack1), {"name":"if","hash":{},"fn":this.program(11, data),"inverse":this.program(13, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                aria-haspopup=\"true\">\r\n                    <span class=\"icon-star\"></span>\r\n            </a>\r\n        </div>\r\n    </div>\r\n    <div class=\"content-refresh-cta\"\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.personalized : stack1), {"name":"if","hash":{},"fn":this.program(15, data),"inverse":this.program(17, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        data-url=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" role=\"button\" tabindex=\"0\">\r\n        <span class=\"icon-dots\"></span>\r\n    </div>\r\n    <div class=\"indicator-share\"\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.personalized : stack1), {"name":"if","hash":{},"fn":this.program(19, data),"inverse":this.program(21, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        data-title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.title : stack1), depth0))
    + "\" data-url=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\"\r\n        data-desc=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.longDescription : stack1), depth0))
    + "\" data-image=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.237.158.jpg\" role=\"button\" tabindex=\"0\">\r\n        <span class=\"icon-share\"></span>\r\n    </div>\r\n\r\n    <div class=\"module-contentrefreshctas content-refresh-slider slide-down\">\r\n        <button class=\"refresh-article active cta-row\">\r\n            <span class=\"icon-refresh\"></span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.personalized : stack1), {"name":"if","hash":{},"fn":this.program(23, data),"inverse":this.program(25, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        </button>\r\n        <button class=\"hide-article active cta-row\">\r\n            <span class=\"icon-views\"></span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.personalized : stack1), {"name":"if","hash":{},"fn":this.program(27, data),"inverse":this.program(29, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        </button>\r\n        <a href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.myinterests : stack1), depth0))
    + "\" class=\"interests-link active cta-row\">\r\n            <span class=\"icon-sliders\"></span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.widedashboardarticle : stack1)) != null ? stack1.personalized : stack1), {"name":"if","hash":{},"fn":this.program(31, data),"inverse":this.program(33, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        </a>\r\n        <div class=\"ellipsis-cta\">\r\n            <span class=\"icon-dots\"></span>\r\n        </div>\r\n    </div>\r\n\r\n</section>\r\n";
},"useData":true});



this["Handlebars"]["templates"]["autocarousel"] = Handlebars.template({"1":function(depth0,helpers,partials,data,depths) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda, buffer = "<a href=\""
    + escapeExpression(((helper = (helper = helpers.CTALink || (depth0 != null ? depth0.CTALink : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"CTALink","hash":{},"data":data}) : helper)))
    + "\" title=\""
    + escapeExpression(((helper = (helper = helpers.jobTitle || (depth0 != null ? depth0.jobTitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"jobTitle","hash":{},"data":data}) : helper)))
    + "\">\r\n    <div class=\"contactcarousel-item\" data-path=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.contactCarousel : stack1)) != null ? stack1.contactCarouselTagUrl : stack1), depth0))
    + "\" data-slideno=\""
    + escapeExpression(lambda((data && data.index), depth0))
    + "\">\r\n        <div class=\"contactcarousel-item-row\">\r\n            <div class=\"col-md-6 col-xs-6\">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.imageGalleryConfigExists : depth0), {"name":"if","hash":{},"fn":this.program(2, data, depths),"inverse":this.program(6, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "            </div>\r\n            <div class=\"contactcarousel-item-description\">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.contactFirstName : depth0), {"name":"if","hash":{},"fn":this.program(8, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                <div class=\"contactcarousel-container\">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.jobTitle : depth0), {"name":"if","hash":{},"fn":this.program(11, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.location : depth0), {"name":"if","hash":{},"fn":this.program(13, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.contactCity : depth0), {"name":"if","hash":{},"fn":this.program(15, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.contactState : depth0), {"name":"if","hash":{},"fn":this.program(17, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                </div>\r\n                <div class=\"contactcarousel-item-partnerDescription\">"
    + escapeExpression(((helper = (helper = helpers.shortDescription || (depth0 != null ? depth0.shortDescription : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"shortDescription","hash":{},"data":data}) : helper)))
    + "</div>\r\n            </div>\r\n        </div>\r\n</div>\r\n</a>\r\n";
},"2":function(depth0,helpers,partials,data,depths) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda, blockHelperMissing=helpers.blockHelperMissing, buffer = "                <div data-picture data-alt='"
    + escapeExpression(((helper = (helper = helpers.jobTitle || (depth0 != null ? depth0.jobTitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"jobTitle","hash":{},"data":data}) : helper)))
    + "'>\r\n";
  stack1 = blockHelperMissing.call(depth0, lambda((depth0 != null ? depth0.imageGalleryConfig : depth0), depth0), {"name":"this.imageGalleryConfig","hash":{},"fn":this.program(3, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                </div>\r\n";
},"3":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "                    <div data-src=\""
    + escapeExpression(lambda((depths[2] != null ? depths[2].assetDomainName : depths[2]), depth0))
    + escapeExpression(lambda((depths[1] != null ? depths[1].profilePhoto : depths[1]), depth0))
    + "/jcr:content/renditions/cq5dam.web."
    + escapeExpression(lambda((depth0 != null ? depth0.width : depth0), depth0))
    + "."
    + escapeExpression(lambda((depth0 != null ? depth0.height : depth0), depth0))
    + ".jpg\" data-media=\"(min-width: "
    + escapeExpression(lambda((depth0 != null ? depth0.dwidth : depth0), depth0))
    + "px)\"></div>\r\n";
  stack1 = helpers['if'].call(depth0, (data && data.last), {"name":"if","hash":{},"fn":this.program(4, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"4":function(depth0,helpers,partials,data) {
  var helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing;
  return "                    <img class=\"img-responsive lazy\" src=\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 "
    + escapeExpression(lambda((depth0 != null ? depth0.width : depth0), depth0))
    + " "
    + escapeExpression(lambda((depth0 != null ? depth0.height : depth0), depth0))
    + "'%2F%3E\" alt=\""
    + escapeExpression(((helper = (helper = helpers.imageAltText || (depth0 != null ? depth0.imageAltText : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"imageAltText","hash":{},"data":data}) : helper)))
    + "\" />\r\n";
},"6":function(depth0,helpers,partials,data,depths) {
  var helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing;
  return "                <img class=\"img-responsive lazy\" data-desktop=\""
    + escapeExpression(lambda((depths[1] != null ? depths[1].assetDomainName : depths[1]), depth0))
    + escapeExpression(((helper = (helper = helpers.profilePhoto || (depth0 != null ? depth0.profilePhoto : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"profilePhoto","hash":{},"data":data}) : helper)))
    + "/jcr:content/renditions/cq5dam.web.237.237.jpg\" data-mobile=\""
    + escapeExpression(lambda((depths[1] != null ? depths[1].assetDomainName : depths[1]), depth0))
    + escapeExpression(((helper = (helper = helpers.profilePhoto || (depth0 != null ? depth0.profilePhoto : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"profilePhoto","hash":{},"data":data}) : helper)))
    + "/jcr:content/renditions/cq5dam.web.237.237.jpg\" alt=\""
    + escapeExpression(((helper = (helper = helpers.jobTitle || (depth0 != null ? depth0.jobTitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"jobTitle","hash":{},"data":data}) : helper)))
    + "\" src=\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 237 237'%2F%3E\" data-src=\"\" />\r\n";
},"8":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "                <p>"
    + escapeExpression(((helper = (helper = helpers.salutation || (depth0 != null ? depth0.salutation : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"salutation","hash":{},"data":data}) : helper)))
    + " "
    + escapeExpression(((helper = (helper = helpers.contactFirstName || (depth0 != null ? depth0.contactFirstName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"contactFirstName","hash":{},"data":data}) : helper)))
    + " "
    + escapeExpression(((helper = (helper = helpers.middleInitial || (depth0 != null ? depth0.middleInitial : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"middleInitial","hash":{},"data":data}) : helper)))
    + " "
    + escapeExpression(((helper = (helper = helpers.contactLastName || (depth0 != null ? depth0.contactLastName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"contactLastName","hash":{},"data":data}) : helper)))
    + " ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.suffix : depth0), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</p>\r\n";
},"9":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = (helper = helpers.suffix || (depth0 != null ? depth0.suffix : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"suffix","hash":{},"data":data}) : helper)));
  },"11":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                    <span class=\"contactcarousel-item-description-title\"> "
    + escapeExpression(((helper = (helper = helpers.jobTitle || (depth0 != null ? depth0.jobTitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"jobTitle","hash":{},"data":data}) : helper)))
    + ", </span>\r\n";
},"13":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                    <span class=\"contactcarousel-item-description-title\"> "
    + escapeExpression(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"location","hash":{},"data":data}) : helper)))
    + ",</span>\r\n";
},"15":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                    <span class=\"contactcarousel-item-description-title\"> "
    + escapeExpression(((helper = (helper = helpers.contactCity || (depth0 != null ? depth0.contactCity : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"contactCity","hash":{},"data":data}) : helper)))
    + "</span>\r\n";
},"17":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                    <span class=\"contactcarousel-item-description-title\">, "
    + escapeExpression(((helper = (helper = helpers.contactState || (depth0 != null ? depth0.contactState : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"contactState","hash":{},"data":data}) : helper)))
    + "</span>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.results : depth0), {"name":"each","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true,"useDepths":true});



this["Handlebars"]["templates"]["articlecarousel-autocarousel"] = Handlebars.template({"1":function(depth0,helpers,partials,data,depths) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda, buffer = "<a href=\"";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.translatedCTAURL : depth0), {"name":"if","hash":{},"fn":this.program(2, data, depths),"inverse":this.program(4, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" title=\""
    + escapeExpression(((helper = (helper = helpers.shortTitle || (depth0 != null ? depth0.shortTitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"shortTitle","hash":{},"data":data}) : helper)))
    + "\">\r\n    <div class=\"articlecarousel-item\" data-slideno=\""
    + escapeExpression(lambda((data && data.index), depth0))
    + "\">\r\n        <div class=\"articlecarousel-item-row\">\r\n            <div class=\"col-md-6 col-xs-6\">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.imageGalleryConfigExists : depth0), {"name":"if","hash":{},"fn":this.program(6, data, depths),"inverse":this.program(10, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "            </div>\r\n            <div class=\"articlecarousel-item-description\">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.shortTitle : depth0), {"name":"if","hash":{},"fn":this.program(12, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                <p class=\"articlecarousel-desc\">\r\n                    <span class=\"articlecarousel-item-partnerDescription\"> "
    + escapeExpression(((helper = (helper = helpers.contactFirstName || (depth0 != null ? depth0.contactFirstName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"contactFirstName","hash":{},"data":data}) : helper)))
    + " "
    + escapeExpression(((helper = (helper = helpers.contactLastName || (depth0 != null ? depth0.contactLastName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"contactLastName","hash":{},"data":data}) : helper)))
    + " "
    + escapeExpression(((helper = (helper = helpers.contactCountry || (depth0 != null ? depth0.contactCountry : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"contactCountry","hash":{},"data":data}) : helper)))
    + " </span>\r\n                </p>\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.publishedDate : depth0), {"name":"if","hash":{},"fn":this.program(14, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                <div class=\"articlecarousel-item-partnerDescription\">"
    + escapeExpression(((helper = (helper = helpers.shortDescription || (depth0 != null ? depth0.shortDescription : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"shortDescription","hash":{},"data":data}) : helper)))
    + "</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</a>\r\n";
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return " "
    + escapeExpression(((helper = (helper = helpers.translatedCTAURL || (depth0 != null ? depth0.translatedCTAURL : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"translatedCTAURL","hash":{},"data":data}) : helper)))
    + " ";
},"4":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return " "
    + escapeExpression(((helper = (helper = helpers.CTALink || (depth0 != null ? depth0.CTALink : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"CTALink","hash":{},"data":data}) : helper)))
    + " ";
},"6":function(depth0,helpers,partials,data,depths) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda, blockHelperMissing=helpers.blockHelperMissing, buffer = "                <div data-picture data-alt='"
    + escapeExpression(((helper = (helper = helpers.imageAltText || (depth0 != null ? depth0.imageAltText : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"imageAltText","hash":{},"data":data}) : helper)))
    + "'>\r\n";
  stack1 = blockHelperMissing.call(depth0, lambda((depth0 != null ? depth0.imageGalleryConfig : depth0), depth0), {"name":"this.imageGalleryConfig","hash":{},"fn":this.program(7, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n                </div>\r\n";
},"7":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "                    <div data-src=\""
    + escapeExpression(lambda((depths[2] != null ? depths[2].assetDomainName : depths[2]), depth0))
    + escapeExpression(lambda((depths[1] != null ? depths[1].imageFileReference : depths[1]), depth0))
    + "/jcr:content/renditions/cq5dam.web."
    + escapeExpression(lambda((depth0 != null ? depth0.width : depth0), depth0))
    + "."
    + escapeExpression(lambda((depth0 != null ? depth0.height : depth0), depth0))
    + ".jpg\" data-media=\"(min-width: "
    + escapeExpression(lambda((depth0 != null ? depth0.dwidth : depth0), depth0))
    + "px)\"></div>\r\n";
  stack1 = helpers['if'].call(depth0, (data && data.last), {"name":"if","hash":{},"fn":this.program(8, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"8":function(depth0,helpers,partials,data) {
  var helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing;
  return "                    <img class=\"img-responsive lazy\" src=\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 "
    + escapeExpression(lambda((depth0 != null ? depth0.width : depth0), depth0))
    + " "
    + escapeExpression(lambda((depth0 != null ? depth0.height : depth0), depth0))
    + "'%2F%3E\" alt=\""
    + escapeExpression(((helper = (helper = helpers.imageAltText || (depth0 != null ? depth0.imageAltText : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"imageAltText","hash":{},"data":data}) : helper)))
    + "\" />\r\n";
},"10":function(depth0,helpers,partials,data,depths) {
  var helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing;
  return "                <img class=\"img-responsive lazy\" src=\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 237 237'%2F%3E\" data-desktop=\""
    + escapeExpression(lambda((depths[1] != null ? depths[1].assetDomainName : depths[1]), depth0))
    + escapeExpression(((helper = (helper = helpers.imageFileReference || (depth0 != null ? depth0.imageFileReference : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"imageFileReference","hash":{},"data":data}) : helper)))
    + "/jcr:content/renditions/cq5dam.web.237.237.jpg\" data-mobile=\""
    + escapeExpression(lambda((depths[1] != null ? depths[1].assetDomainName : depths[1]), depth0))
    + escapeExpression(((helper = (helper = helpers.imageFileReference || (depth0 != null ? depth0.imageFileReference : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"imageFileReference","hash":{},"data":data}) : helper)))
    + "/jcr:content/renditions/cq5dam.web.237.237.jpg\" alt=\""
    + escapeExpression(((helper = (helper = helpers.imageAltText || (depth0 != null ? depth0.imageAltText : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"imageAltText","hash":{},"data":data}) : helper)))
    + "\" />\r\n";
},"12":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                <p class=\"articlecarousel-title\">\r\n                    <span class=\"articlecarousel-item-description-title\"> "
    + escapeExpression(((helper = (helper = helpers.shortTitle || (depth0 != null ? depth0.shortTitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"shortTitle","hash":{},"data":data}) : helper)))
    + "</span>\r\n                </p>\r\n";
},"14":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                <p class=\"articlecarousel-desc-date\">\r\n                    <span class=\"articlecarousel-item-partnerDescription\">"
    + escapeExpression(((helper = (helper = helpers.publishedDate || (depth0 != null ? depth0.publishedDate : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"publishedDate","hash":{},"data":data}) : helper)))
    + "</span>\r\n                </p>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.results : depth0), {"name":"each","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true,"useDepths":true});



this["Handlebars"]["templates"]["caasResultSet"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<li class=\"caas-result-item\">\r\n    <a href=\""
    + escapeExpression(lambda((depth0 != null ? depth0.id : depth0), depth0))
    + "\" title=\""
    + escapeExpression(lambda((depth0 != null ? depth0.title : depth0), depth0))
    + "\">\r\n        <!-- title section -->\r\n        <div class=\"row title-row\">\r\n            <div class=\"col-md-12\">\r\n                <p class=\"caas-title\">"
    + escapeExpression(lambda((depth0 != null ? depth0.title : depth0), depth0))
    + "</p>\r\n            </div>\r\n        </div>\r\n        <!-- description section -->\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n                <p class=\"caas-description\">"
    + escapeExpression(lambda((depth0 != null ? depth0.description : depth0), depth0))
    + "</p>\r\n            </div>\r\n        </div>\r\n    </a>\r\n</li>\r\n";
},"useData":true});



this["Handlebars"]["templates"]["dashboardbanner"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return " hide ";
  },"3":function(depth0,helpers,partials,data) {
  return "hide";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<section class=\"module-dashboardbanner component component-trackable\">\r\n\r\n    <!-- SPINNER only on client-side and not on author-side -->\r\n    <div class=\"web-spinner ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.isAuthor : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\r\n            <img src=\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 1082 378'%2F%3E\"  width=\"1082\" height=\"378\" class=\"desktop-only img-responsive\" />\r\n            <img src=\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 640 490'%2F%3E\"  width=\"640\" height=\"580\" class=\"mobile-only img-responsive\" />\r\n    </div>\r\n\r\n    <!-- DO NOT DISPLAY when page is loaded on client side. -->\r\n    <a href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.DashBoardBanner : stack1)) != null ? stack1.url : stack1), depth0))
    + "\" class=\"dashboard-banner-cta\">\r\n        <div class=\"overlay-holder ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.isAuthor : stack1), {"name":"unless","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\r\n            <span class=\"stripe-1\"></span> \r\n            <span class=\"stripe-2\"></span>\r\n            <span class=\"stripe-3\"></span>\r\n            <span class=\"banner-title "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.DashBoardBanner : stack1)) != null ? stack1.variant : stack1), depth0))
    + "\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.DashBoardBanner : stack1)) != null ? stack1.title : stack1), depth0))
    + "</span>\r\n        </div>\r\n    </a>\r\n    <a href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.DashBoardBanner : stack1)) != null ? stack1.url : stack1), depth0))
    + "\" class=\"dashboard-banner-cta\">\r\n        <img data-src=\"\" class=\"img-responsive lazy ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.isAuthor : stack1), {"name":"unless","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\" alt=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.DashBoardBanner : stack1)) != null ? stack1.bannerAltText : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.DashBoardBanner : stack1)) != null ? stack1.bannerAltText : stack1), depth0))
    + "\"\r\n            src=\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 1082 378'%2F%3E\"\r\n            data-mobile=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.DashBoardBanner : stack1)) != null ? stack1.bannerimage : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.640.490.jpg\"\r\n            data-desktop=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.DashBoardBanner : stack1)) != null ? stack1.bannerimage : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.1082.378.jpg\"\r\n        />\r\n    </a>\r\n</section>\r\n";
},"useData":true});



this["Handlebars"]["templates"]["eResources"] = Handlebars.template({"1":function(depth0,helpers,partials,data,depths) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        <div class=\"bg-white\">\r\n            <div class=\"pull-left\">\r\n                <div class=\"row\">\r\n                    <a class=\"btn-cta buttonContainer\" href=\""
    + escapeExpression(lambda((depths[1] != null ? depths[1].assetDomainName : depths[1]), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.resourcePath : depth0), depth0))
    + "\" target=\"_blank\" title=\""
    + escapeExpression(lambda((depth0 != null ? depth0.resourceType : depth0), depth0))
    + "\">\r\n                        <span class=\"icon-"
    + escapeExpression(lambda((depth0 != null ? depth0.resourceType : depth0), depth0))
    + "\"></span>\r\n                        <span class=\"visually-hidden\">"
    + escapeExpression(lambda((depth0 != null ? depth0.resourceType : depth0), depth0))
    + "</span>\r\n                        <div class=\"downloadDesc\">\r\n                            <span class=\"resouceLabel\"> "
    + escapeExpression(lambda((depth0 != null ? depth0.downloadButtonLabel : depth0), depth0))
    + " "
    + escapeExpression(lambda((depth0 != null ? depth0.resourceType : depth0), depth0))
    + " </span>\r\n                            <span class=\"resourceSize\"> ("
    + escapeExpression(lambda((depth0 != null ? depth0.resourceType : depth0), depth0))
    + " "
    + escapeExpression(lambda((depth0 != null ? depth0.resourceSize : depth0), depth0))
    + ") </span>\r\n                        </div>\r\n                    </a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<div class=\"module-eventresources-content-item col-md-3 col-md-height col-sm-height col-full-height col-top\">\r\n    <h3 class=\"tertiary-head\">"
    + escapeExpression(lambda((depth0 != null ? depth0.eventTitle : depth0), depth0))
    + "</h3>\r\n    <p>"
    + escapeExpression(lambda((depth0 != null ? depth0.eventSubtitle : depth0), depth0))
    + "</p>\r\n    <div class=\"cta-space\">&nbsp;</div>\r\n    <div class=\"downloadbutton\">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.resourcePath : depth0), {"name":"if","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\r\n</div>";
},"useData":true,"useDepths":true});



this["Handlebars"]["templates"]["interestspartialtmpl"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing;
  return "        <a class=\"tab-title\" id=\"tab"
    + escapeExpression(lambda((data && data.index), depth0))
    + "\" href=\"#\" onclick=\"return false\" data-id=\""
    + escapeExpression(((helper = (helper = helpers['zthes-id'] || (depth0 != null ? depth0['zthes-id'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"zthes-id","hash":{},"data":data}) : helper)))
    + "\" data-english-name=\""
    + escapeExpression(((helper = (helper = helpers['english-name'] || (depth0 != null ? depth0['english-name'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"english-name","hash":{},"data":data}) : helper)))
    + "\" role=\"tab\" tabindex=\"0\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</a>\r\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda, buffer = "    <div class=\"accordion-title mobile-only\" data-id=\""
    + escapeExpression(((helper = (helper = helpers['zthes-id'] || (depth0 != null ? depth0['zthes-id'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"zthes-id","hash":{},"data":data}) : helper)))
    + "\" data-english-name=\""
    + escapeExpression(((helper = (helper = helpers['english-name'] || (depth0 != null ? depth0['english-name'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"english-name","hash":{},"data":data}) : helper)))
    + "\" tabindex=\"0\">\r\n        <span class=\"text-data\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\r\n        <span class=\"expand-status\"></span>\r\n    </div>\r\n    <div class=\"subtitles-content-container\" data-id=\""
    + escapeExpression(((helper = (helper = helpers['zthes-id'] || (depth0 != null ? depth0['zthes-id'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"zthes-id","hash":{},"data":data}) : helper)))
    + "\" role=\"tabpanel\" aria-labelledby=\"tab"
    + escapeExpression(lambda((data && data.index), depth0))
    + "\">\r\n        <div class=\"search-container\">\r\n            <input class=\"search-input\" type=\"text\" placeholder=\"Search\">\r\n            <span class=\"search-icon\"></span>\r\n            <div class=\"clear\"></div>\r\n        </div>\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.tags : depth0), {"name":"each","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        <div class=\"clear\"></div>\r\n    </div>\r\n";
},"4":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "            <div class=\"subtitle-content-container\" data-id=\""
    + escapeExpression(((helper = (helper = helpers['zthes-id'] || (depth0 != null ? depth0['zthes-id'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"zthes-id","hash":{},"data":data}) : helper)))
    + "\">\r\n                <div class=\"accordion-subtitle ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.tags : depth0)) != null ? stack1.length : stack1), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-original-text=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" data-lower-text=\""
    + escapeExpression(((helpers.toLowerCase || (depth0 && depth0.toLowerCase) || helperMissing).call(depth0, (depth0 != null ? depth0.name : depth0), {"name":"toLowerCase","hash":{},"data":data})))
    + "\" tabindex=\"0\" role=\"checkbox\">\r\n                    <span class=\"action-icon\" tabindex=\"0\"></span>\r\n                    <span class=\"text-data\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.tags : depth0)) != null ? stack1.length : stack1), {"name":"if","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                </div>\r\n                <ul class=\"tags-holder no-padding col-md-12\">\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.tags : depth0), {"name":"each","hash":{},"fn":this.program(9, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                </ul>\r\n            </div>\r\n";
},"5":function(depth0,helpers,partials,data) {
  return "has-tags";
  },"7":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                        <span class=\"expand-status\"></span>\r\n                        <span class=\"total-count\"> / "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.tags : depth0)) != null ? stack1.length : stack1), depth0))
    + "</span>\r\n                        <span class=\"selection-count\">0</span>\r\n";
},"9":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                        <li class=\"tag-holder\" data-id=\""
    + escapeExpression(((helper = (helper = helpers['zthes-id'] || (depth0 != null ? depth0['zthes-id'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"zthes-id","hash":{},"data":data}) : helper)))
    + "\" data-original-text=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" data-lower-text=\""
    + escapeExpression(((helpers.toLowerCase || (depth0 && depth0.toLowerCase) || helperMissing).call(depth0, (depth0 != null ? depth0.name : depth0), {"name":"toLowerCase","hash":{},"data":data})))
    + "\" tabindex=\"0\" role=\"checkbox\">\r\n                            <span class=\"action-icon\"></span>\r\n                            <span class=\"text-data\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\r\n                        </li>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"tab-menu no-padding col-md-12 desktop-only\" role=\"tablist\">\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.tags : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "</div>\r\n<div class=\"clear\"></div>\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.tags : depth0), {"name":"each","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});



this["Handlebars"]["templates"]["relatedcontent"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return " "
    + escapeExpression(lambda((depth0 != null ? depth0.translatedCTAURL : depth0), depth0))
    + " ";
},"3":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return " "
    + escapeExpression(lambda((depth0 != null ? depth0.primaryCTAURL : depth0), depth0))
    + " ";
},"5":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "    <div class=\"library-desktop ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.isBlog : depth0), {"name":"if","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " \">\r\n        <div class=\"module-addtolibrary component self-contained clearfix\" aria-label=\"add to Library\" data-description=\"";
  stack1 = lambda((depth0 != null ? depth0.shortDescription : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-shortDescription=\"";
  stack1 = lambda((depth0 != null ? depth0.shortDescription : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-href=\"";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.translatedCTAURL : depth0), {"name":"if","hash":{},"fn":this.program(8, data),"inverse":this.program(10, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-image=\""
    + escapeExpression(lambda((depth0 != null ? depth0.imageFileReference : depth0), depth0))
    + "\" data-title=\"";
  stack1 = lambda((depth0 != null ? depth0.shortTitle : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-shortTitle=\"";
  stack1 = lambda((depth0 != null ? depth0.shortTitle : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\" style=\"display:none;\">\r\n            <a href=\"javascript:;\" class=\"addtolibrary-cta\" data-backdrop=\"static\" data-keyboard=\"false\" data-modal-url=\"\" data-remote=\"\" id=\"addToLibrary\" tabindex=\"0\" title=\"Add to library\" aria-haspopup=\"true\">\r\n                <span class=\"icon-star\"></span>\r\n            </a>\r\n        </div>\r\n    </div>\r\n";
},"6":function(depth0,helpers,partials,data) {
  return " hidden";
  },"8":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda((depth0 != null ? depth0.translatedCTAURL : depth0), depth0));
  },"10":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda((depth0 != null ? depth0.primaryCTAURL : depth0), depth0));
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda, buffer = "<div class=\"col-md-12 col-xs-12 relatedcomponent-innerContainer bg-white grid\" data-article-type=\""
    + escapeExpression(((helper = (helper = helpers.articleType || (depth0 != null ? depth0.articleType : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"articleType","hash":{},"data":data}) : helper)))
    + "\">\r\n    <a href=\"";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.translatedCTAURL : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" title=\""
    + escapeExpression(lambda((depth0 != null ? depth0.imageAltText : depth0), depth0))
    + "\" aria-labelledby=\"Read more about "
    + escapeExpression(lambda((depth0 != null ? depth0.shortTitle : depth0), depth0))
    + "\">\r\n        <div class=\"relatedcomponent-image\">\r\n            <img src=\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 237 158'%2F%3E\" data-desktop=\""
    + escapeExpression(lambda((depth0 != null ? depth0.assetDomainName : depth0), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.imageFileReference : depth0), depth0))
    + "/jcr:content/renditions/cq5dam.web.237.158.jpg\" data-mobile=\""
    + escapeExpression(lambda((depth0 != null ? depth0.assetDomainName : depth0), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.imageFileReference : depth0), depth0))
    + "/jcr:content/renditions/cq5dam.web.512.341.jpg\" alt=\""
    + escapeExpression(lambda((depth0 != null ? depth0.imageAltText : depth0), depth0))
    + "\" class=\"lazy img-responsive\"/>\r\n        </div>\r\n        <h3 class=\"tertiary-head\">";
  stack1 = lambda((depth0 != null ? depth0.shortTitle : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "</h3>\r\n        <p class=\"related-description\">";
  stack1 = lambda((depth0 != null ? depth0.shortDescription : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "</p>\r\n    </a>\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.articleDetail : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\r\n";
},"useData":true});



this["Handlebars"]["templates"]["publicationserieslist"] = Handlebars.template({"1":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<li class=\"Publicationserieslist-listingGroupLink\">\r\n    <a href=\"";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.translatedCTAURL : depth0), {"name":"if","hash":{},"fn":this.program(2, data, depths),"inverse":this.program(4, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\">\r\n    	<span class=\"public-link-text\">\r\n          "
    + escapeExpression(lambda((depths[1] != null ? depths[1].label : depths[1]), depth0))
    + "\r\n    	  "
    + escapeExpression(lambda((depth0 != null ? depth0.issueNumber : depth0), depth0))
    + "\r\n        </span>\r\n     <span class=\"icon-chevron-right\"></span>\r\n    </a>\r\n</li>\r\n";
},"2":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return " "
    + escapeExpression(lambda((depth0 != null ? depth0.translatedCTAURL : depth0), depth0))
    + " ";
},"4":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return " "
    + escapeExpression(lambda((depth0 != null ? depth0.articleURL : depth0), depth0))
    + " ";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.results : depth0), {"name":"each","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true,"useDepths":true});



this["Handlebars"]["templates"]["filmstripitem"] = Handlebars.template({"1":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<li class=\"each-slide article\">\r\n   <a href=\"";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.translatedCTAURL : depth0), {"name":"if","hash":{},"fn":this.program(2, data, depths),"inverse":this.program(4, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" class=\"item\" title=\""
    + escapeExpression(lambda((depth0 != null ? depth0.imageAltText : depth0), depth0))
    + "\">\r\n      <div class=\"item-header-container\">\r\n         <h4 class=\"item-header line-clamp line-clamp-2\">"
    + escapeExpression(lambda((depth0 != null ? depth0.shortTitle : depth0), depth0))
    + "</h4>\r\n      </div>\r\n      <span class=\"pull-left\">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.imageGalleryConfigExists : depth0), {"name":"if","hash":{},"fn":this.program(6, data, depths),"inverse":this.program(10, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n	  </span>\r\n      <span class=\"pull-left short-description line-clamp line-clamp-5\">\r\n      "
    + escapeExpression(lambda((depth0 != null ? depth0.shortDescription : depth0), depth0))
    + "\r\n      </span>\r\n   </a>\r\n</li>\r\n";
},"2":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return " "
    + escapeExpression(lambda((depth0 != null ? depth0.translatedCTAURL : depth0), depth0))
    + " ";
},"4":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return " "
    + escapeExpression(lambda((depth0 != null ? depth0.articleURL : depth0), depth0))
    + " ";
},"6":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing, buffer = "                    <div data-picture data-alt='"
    + escapeExpression(lambda((depth0 != null ? depth0.imageAltText : depth0), depth0))
    + "'>\r\n\r\n\r\n";
  stack1 = blockHelperMissing.call(depth0, lambda((depth0 != null ? depth0.imageGalleryConfig : depth0), depth0), {"name":"this.imageGalleryConfig","hash":{},"fn":this.program(7, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n          				</div>\r\n";
},"7":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "\r\n                        <div data-src=\""
    + escapeExpression(lambda((depths[2] != null ? depths[2].assetDomainName : depths[2]), depth0))
    + escapeExpression(lambda((depths[1] != null ? depths[1].imageFileReference : depths[1]), depth0))
    + "/jcr:content/renditions/cq5dam.web."
    + escapeExpression(lambda((depth0 != null ? depth0.width : depth0), depth0))
    + "."
    + escapeExpression(lambda((depth0 != null ? depth0.height : depth0), depth0))
    + ".jpg\" data-media=\"(min-width: "
    + escapeExpression(lambda((depth0 != null ? depth0.dwidth : depth0), depth0))
    + "px)\"></div>\r\n";
  stack1 = helpers['if'].call(depth0, (data && data.last), {"name":"if","hash":{},"fn":this.program(8, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"8":function(depth0,helpers,partials,data) {
  var helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing;
  return "                                <img class=\"img-responsive lazy\" src=\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 "
    + escapeExpression(lambda((depth0 != null ? depth0.width : depth0), depth0))
    + " "
    + escapeExpression(lambda((depth0 != null ? depth0.height : depth0), depth0))
    + "'%2F%3E\" alt=\""
    + escapeExpression(((helper = (helper = helpers.imageAltText || (depth0 != null ? depth0.imageAltText : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"imageAltText","hash":{},"data":data}) : helper)))
    + "\" />\r\n";
},"10":function(depth0,helpers,partials,data,depths) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                 <img data-desktop=\""
    + escapeExpression(lambda((depths[1] != null ? depths[1].assetDomainName : depths[1]), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.imageFileReference : depth0), depth0))
    + "/jcr:content/renditions/cq5dam.web.237.300.jpg\" data-mobile=\""
    + escapeExpression(lambda((depths[1] != null ? depths[1].assetDomainName : depths[1]), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.imageFileReference : depth0), depth0))
    + "/jcr:content/renditions/cq5dam.web.237.300.jpg\" alt=\""
    + escapeExpression(lambda((depth0 != null ? depth0.imageAltText : depth0), depth0))
    + "\" src=\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 237 300'%2F%3E\" class=\"lazy\" />\r\n";
},"12":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "<li class=\"each-slide event\">\r\n   <a href=\"";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.translatedCTAURL : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.program(13, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" class=\"item\">\r\n      <div class=\"item-header-container\">\r\n         <h4 class=\"item-header line-clamp line-clamp-2\">"
    + escapeExpression(lambda((depth0 != null ? depth0.eventShortTitle : depth0), depth0))
    + "</h4>\r\n      </div>\r\n      <div class=\"filmstripcarousel-event-date\">\r\n         <div class=\"filmstripcarousel-event-calendar\">\r\n            <div class=\"filmstripcarousel-event-icon\">\r\n               <div class=\"filmstripcarousel-event-month\">"
    + escapeExpression(lambda((depth0 != null ? depth0.liveTextMonth : depth0), depth0))
    + "</div>\r\n               <span class=\"icon-calendar\"></span>\r\n               <div class=\"filmstripcarousel-event-day\">"
    + escapeExpression(lambda((depth0 != null ? depth0.liveTextDate : depth0), depth0))
    + "</div>\r\n            </div>\r\n         </div>\r\n          <div class=\"filmstripcarousel-event-address line-clamp line-clamp-5\">\r\n";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0.eventStartDate : depth0), "eq", (depth0 != null ? depth0.eventEndDate : depth0), {"name":"compare","hash":{},"fn":this.program(15, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0.eventStartDate : depth0), "neq", (depth0 != null ? depth0.eventEndDate : depth0), {"name":"compare","hash":{},"fn":this.program(17, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.venue : depth0), {"name":"if","hash":{},"fn":this.program(19, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.city : depth0), {"name":"if","hash":{},"fn":this.program(21, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.state : depth0), {"name":"if","hash":{},"fn":this.program(23, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.country : depth0), {"name":"if","hash":{},"fn":this.program(25, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "         </div>\r\n      </div>\r\n      <p class=\"filmstripcarousel-event-description line-clamp line-clamp-3\">\r\n        "
    + escapeExpression(lambda((depth0 != null ? depth0.eventShortDescription : depth0), depth0))
    + "\r\n      </p>\r\n   </a>\r\n</li>\r\n";
},"13":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return " "
    + escapeExpression(lambda((depth0 != null ? depth0.eventURL : depth0), depth0))
    + " ";
},"15":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <p>"
    + escapeExpression(((helpers.formateDateSolr || (depth0 && depth0.formateDateSolr) || helperMissing).call(depth0, (depth0 != null ? depth0.eventStartDateLocal : depth0), "mmm dd", (depth0 != null ? depth0.eventStartDate : depth0), {"name":"formateDateSolr","hash":{},"data":data})))
    + "  </p>\r\n";
},"17":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <p>"
    + escapeExpression(((helpers.formateDateSolr || (depth0 && depth0.formateDateSolr) || helperMissing).call(depth0, (depth0 != null ? depth0.eventStartDateLocal : depth0), "mmm dd", (depth0 != null ? depth0.eventStartDate : depth0), {"name":"formateDateSolr","hash":{},"data":data})))
    + "  - "
    + escapeExpression(((helpers.formateDateSolr || (depth0 && depth0.formateDateSolr) || helperMissing).call(depth0, (depth0 != null ? depth0.eventEndDateLocal : depth0), "mmm dd", (depth0 != null ? depth0.eventEndDate : depth0), {"name":"formateDateSolr","hash":{},"data":data})))
    + " </p>\r\n";
},"19":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "              <p>"
    + escapeExpression(lambda((depth0 != null ? depth0.venue : depth0), depth0))
    + "</p>\r\n";
},"21":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "              <p>"
    + escapeExpression(lambda((depth0 != null ? depth0.city : depth0), depth0))
    + "</p>\r\n";
},"23":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "              <p>"
    + escapeExpression(lambda((depth0 != null ? depth0.state : depth0), depth0))
    + "</p>\r\n";
},"25":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "              <p>"
    + escapeExpression(lambda((depth0 != null ? depth0.country : depth0), depth0))
    + "</p>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.isArticle : depth0), {"name":"if","hash":{},"fn":this.program(1, data, depths),"inverse":this.program(12, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true,"useDepths":true});



this["Handlebars"]["templates"]["listings"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<li class=\"listing-listingGroupLink\">\r\n    <a class=\"no-highlight\" href = \""
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_URL : depth0), depth0))
    + "\">\r\n        <span class=\"listing-link-text\">"
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Title : depth0), depth0))
    + "</span>\r\n        <span class=\"icon-chevron-right\"></span>\r\n    </a>\r\n</li>      \r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0['personalized-results'] : depth0)) != null ? stack1.resultset : stack1)) != null ? stack1.results : stack1)) != null ? stack1.result : stack1), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});



this["Handlebars"]["templates"]["trendingtopic"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "    <li class=\"trendinglist-listingGroupLink\">\r\n        <a class=\"no-highlight\" href = \""
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_URL : depth0), depth0))
    + "\">\r\n            <span class=\"trendinglist-content\">"
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Title : depth0), depth0))
    + "</span>\r\n            <span class=\"icon-chevron-right\"></span>\r\n        </a>\r\n    </li>      \r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0['customer-results'] : depth0)) != null ? stack1.resultset : stack1)) != null ? stack1.results : stack1)) != null ? stack1.result : stack1), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});



this["Handlebars"]["templates"]["touch-promotional"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.imageConfigExists : stack1), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.program(10, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n";
},"2":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, blockHelperMissing=helpers.blockHelperMissing, buffer = "                <picture>\r\n";
  stack1 = blockHelperMissing.call(depth0, lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.imageConfig : stack1), depth0), {"name":"hbs.promotional.imageConfig","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                </picture>\r\n\r\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.isDesktop : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.program(6, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, (data && data.last), {"name":"if","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"4":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                            <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web."
    + escapeExpression(lambda((depth0 != null ? depth0.imagewidth : depth0), depth0))
    + "."
    + escapeExpression(lambda((depth0 != null ? depth0.imageheight : depth0), depth0))
    + ".jpg\"\r\n                                media=\"screen  and (min-width: 641px) and (max-width: 9440px)\" >\r\n";
},"6":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                            <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web."
    + escapeExpression(lambda((depth0 != null ? depth0.imagewidth : depth0), depth0))
    + "."
    + escapeExpression(lambda((depth0 != null ? depth0.imageheight : depth0), depth0))
    + ".jpg\"\r\n                                media=\"screen  and (min-width: 0px) and (max-width: 640px)\" >\r\n";
},"8":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing;
  return "                            <img class=\"img-responsive\" src=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web."
    + escapeExpression(lambda((depth0 != null ? depth0.imagewidth : depth0), depth0))
    + "."
    + escapeExpression(lambda((depth0 != null ? depth0.imageheight : depth0), depth0))
    + ".jpg\" alt=\""
    + escapeExpression(((helper = (helper = helpers.imageAltText || (depth0 != null ? depth0.imageAltText : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"imageAltText","hash":{},"data":data}) : helper)))
    + "\" title=\""
    + escapeExpression(((helper = (helper = helpers.imageAltText || (depth0 != null ? depth0.imageAltText : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"imageAltText","hash":{},"data":data}) : helper)))
    + "\"/>\r\n";
},"10":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.one : stack1), {"name":"if","hash":{},"fn":this.program(11, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.two : stack1), {"name":"if","hash":{},"fn":this.program(13, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"11":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    <picture>\r\n                           <!--[if IE 9]><video style=\"display: none;\"><![endif]-->\r\n                           <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.583.282.jpg\" media=\"screen  and (min-width: 0px) and (max-width: 640px)\">\r\n                           <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.418.203.jpg\" media=\"screen  and (min-width: 641px) and (max-width: 9440px)\">\r\n                           <!--[if IE 9]></video><![endif]-->\r\n                           <img class=\"img-responsive\" src=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.418.203.jpg\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\" alt=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\">\r\n                    </picture>\r\n";
},"13":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    <picture>\r\n                           <!--[if IE 9]><video style=\"display: none;\"><![endif]-->\r\n                           <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.583.282.jpg\" media=\"screen  and (min-width: 0px) and (max-width: 640px)\">\r\n                           <source srcset=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.484.232.jpg\" media=\"screen  and (min-width: 641px) and (max-width: 9440px)\">\r\n                           <!--[if IE 9]></video><![endif]-->\r\n                           <img class=\"img-responsive\" src=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.globalValues : stack1)) != null ? stack1.assetDomainName : stack1), depth0))
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.imageFileReference : stack1), depth0))
    + "/jcr:content/renditions/cq5dam.web.484.232.jpg\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\" alt=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\">\r\n                    </picture>\r\n";
},"15":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.isFormated : stack1), {"name":"if","hash":{},"fn":this.program(16, data),"inverse":this.program(18, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"16":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    <p class=\"publish-date\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.publishDate : stack1), depth0))
    + "</p>\r\n";
},"18":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    <p class=\"publish-date format-publish-date\" data-publishedDate=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.publishDate : stack1), depth0))
    + "\"></p>\r\n";
},"20":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.shortTitle : stack1), {"name":"if","hash":{},"fn":this.program(21, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.shortDescription : stack1), {"name":"if","hash":{},"fn":this.program(23, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"21":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    <h3 class=\"tertiary-head line-clamp line-clamp-2\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.shortTitle : stack1), depth0))
    + "</h3>\r\n";
},"23":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    <p class=\"tertiary-desc line-clamp line-clamp-5\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.shortDescription : stack1), depth0))
    + "</p>\r\n";
},"25":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.title : stack1), {"name":"if","hash":{},"fn":this.program(26, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.longDescription : stack1), {"name":"if","hash":{},"fn":this.program(28, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"26":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    <h3 class=\"tertiary-head line-clamp line-clamp-2\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.title : stack1), depth0))
    + "</h3>\r\n";
},"28":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    <p class=\"tertiary-desc line-clamp line-clamp-5\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.longDescription : stack1), depth0))
    + "</p>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<!-- Begin Component: TouchPromotional -->\r\n<section class=\"module-touch-promotional component promotional-cell-hover component-trackable\">\r\n    <a href=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.primaryUrl : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.altText : stack1), depth0))
    + "\" data-topic=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.topic : stack1), depth0))
    + "\" x-cq-linkchecker=\"skip\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.imageFileReference : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        <div class=\"desc-wrapper\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.publishDate : stack1), {"name":"if","hash":{},"fn":this.program(15, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.one : stack1), {"name":"if","hash":{},"fn":this.program(20, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.promotional : stack1)) != null ? stack1.two : stack1), {"name":"if","hash":{},"fn":this.program(25, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        </div>\r\n    </a>\r\n</section>\r\n<!-- End Component: TouchPromotional -->\r\n";
},"useData":true});



this["Handlebars"]["templates"]["toppicks"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return " style=\"display:none;\" ";
  },"3":function(depth0,helpers,partials,data,depths) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda;
  return "            <div class=\"col-md-3 col-md-height col-full-height col-top promotional-cell-hover article\" data-article-type=\""
    + escapeExpression(((helper = (helper = helpers.articleType || (depth0 != null ? depth0.articleType : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"articleType","hash":{},"data":data}) : helper)))
    + "\">\r\n                <a href=\""
    + escapeExpression(((helper = (helper = helpers.translatedCTAURL || (depth0 != null ? depth0.translatedCTAURL : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"translatedCTAURL","hash":{},"data":data}) : helper)))
    + "\" title=\""
    + escapeExpression(((helper = (helper = helpers.imageAltText || (depth0 != null ? depth0.imageAltText : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"imageAltText","hash":{},"data":data}) : helper)))
    + "\" tabindex=\"0\">\r\n                    <img\r\n                        src=\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 237 158'%2F%3E\"\r\n                        data-desktop=\""
    + escapeExpression(lambda((depths[1] != null ? depths[1].kpmgAssetDomain : depths[1]), depth0))
    + escapeExpression(((helper = (helper = helpers.imageFileReference || (depth0 != null ? depth0.imageFileReference : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"imageFileReference","hash":{},"data":data}) : helper)))
    + "/jcr:content/renditions/cq5dam.web.237.158.jpg\"\r\n                        data-mobile=\""
    + escapeExpression(lambda((depths[1] != null ? depths[1].kpmgAssetDomain : depths[1]), depth0))
    + escapeExpression(((helper = (helper = helpers.imageFileReference || (depth0 != null ? depth0.imageFileReference : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"imageFileReference","hash":{},"data":data}) : helper)))
    + "/jcr:content/renditions/cq5dam.web.512.341.jpg\"\r\n                        alt=\""
    + escapeExpression(((helper = (helper = helpers.imageAltText || (depth0 != null ? depth0.imageAltText : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"imageAltText","hash":{},"data":data}) : helper)))
    + "\" class=\"lazy img-responsive\"/>\r\n                    <!--<img src=\""
    + escapeExpression(((helper = (helper = helpers.imageFileReference || (depth0 != null ? depth0.imageFileReference : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"imageFileReference","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + escapeExpression(((helper = (helper = helpers.imageAltText || (depth0 != null ? depth0.imageAltText : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"imageAltText","hash":{},"data":data}) : helper)))
    + "\"/>-->\r\n                    <h4 class=\"heading\">"
    + escapeExpression(((helper = (helper = helpers.shortTitle || (depth0 != null ? depth0.shortTitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"shortTitle","hash":{},"data":data}) : helper)))
    + "</h4>\r\n                    <p class=\"content\">"
    + escapeExpression(((helper = (helper = helpers.shortDescription || (depth0 != null ? depth0.shortDescription : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"shortDescription","hash":{},"data":data}) : helper)))
    + "</p>\r\n                </a>\r\n            </div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, buffer = "<!-- Begin Component: Toppicks -->\r\n<section class=\"module-toppicks component clearfix\" data-name-format=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.toppicks : stack1)) != null ? stack1.nameFormat : stack1), depth0))
    + "\" data-solr-query=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.toppicks : stack1)) != null ? stack1.solrQuery : stack1), depth0))
    + "\" article=\"true\" data-name-switch=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.toppicks : stack1)) != null ? stack1.firstnameLastnameSwitch : stack1), depth0))
    + "\" tabindex=\"0\" ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.isAuthor : stack1), {"name":"unless","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += ">\r\n\r\n    <!-- COMPONENT HEADING -->\r\n    <h3 class=\"component-header\">"
    + escapeExpression(((helper = (helper = helpers.titleText || (depth0 != null ? depth0.titleText : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"titleText","hash":{},"data":data}) : helper)))
    + "</h3>\r\n\r\n    <!-- ARTICLES CONTAINER -->\r\n    <div class=\"articles clearfix\">\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.data : depth0), {"name":"each","hash":{},"fn":this.program(3, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\r\n</section>\r\n\r\n<!-- End Component: Toppicks -->\r\n";
},"useData":true,"useDepths":true});



this["Handlebars"]["templates"]["publications"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return " "
    + escapeExpression(lambda((depth0 != null ? depth0.translatedCTAURL : depth0), depth0))
    + " ";
},"3":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return " "
    + escapeExpression(lambda((depth0 != null ? depth0.detailURL : depth0), depth0))
    + " ";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<div class=\"contact-tabs-item col-md-12 promotional-cell-hover\">\r\n    <a class=\"contact-cta-wrapper\" href=\"";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.translatedCTAURL : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\"\r\n        title=\""
    + escapeExpression(lambda((depth0 != null ? depth0.title : depth0), depth0))
    + "\">\r\n        <div class=\"col-md-4\">\r\n            <img src=\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 237 158'%2F%3E\"\r\n            alt=\"publications item image\" data-mobile=\""
    + escapeExpression(lambda((depth0 != null ? depth0.assetDomainName : depth0), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.imageFileReference : depth0), depth0))
    + "/jcr:content/renditions/cq5dam.web.512.341.jpg\"\r\n            data-desktop=\""
    + escapeExpression(lambda((depth0 != null ? depth0.assetDomainName : depth0), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.imageFileReference : depth0), depth0))
    + "/jcr:content/renditions/cq5dam.web.237.158.jpg\"\r\n            class=\"img-responsive lazy\"/>\r\n        </div>\r\n        <div class=\"col-md-8\">\r\n            <h3 class=\"secondary-head\">"
    + escapeExpression(lambda((depth0 != null ? depth0.title : depth0), depth0))
    + "</h3>\r\n            <p class=\"publication-date\">"
    + escapeExpression(lambda((depth0 != null ? depth0.articleDate : depth0), depth0))
    + "</p>\r\n            <p class=\"short-description\">"
    + escapeExpression(lambda((depth0 != null ? depth0.shortDescription : depth0), depth0))
    + "</p>\r\n        </div>\r\n    </a>\r\n</div>\r\n";
},"useData":true});



this["Handlebars"]["templates"]["connections"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "add20paddingbottom";
  },"3":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    <div class=\"cta-space\">&nbsp;</div>\r\n                    <div class=\"pull-right\">\r\n                        <span class=\"btn-cta contact-btn\" tabindex=\"0\">\r\n                            <span class=\"icon-chevron-right\"></span>\r\n                            <span class=\"contact btn-modal pcfLink modal-open\" title=\"\">"
    + escapeExpression(lambda((depth0 != null ? depth0.contactFormLinkCopy : depth0), depth0))
    + "</span>\r\n                        </span>\r\n                    </div>\r\n";
},"5":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    <div class=\"cta-space\">&nbsp;</div>\r\n                    <div class=\"pull-right\">\r\n                        <span tabindex=\"0\" class=\"btn-cta contact-btn\">\r\n                            <span class=\"icon-email \"></span>\r\n                            <span id=\""
    + escapeExpression(lambda((depth0 != null ? depth0.contactPageName : depth0), depth0))
    + "\" data-modal-url=\"/etc/partials/kpmgpublic/peoplecontactform/peoplecontactform.html\"\r\n                            data-remote=\""
    + escapeExpression(lambda((depth0 != null ? depth0.peopleContactFormLink : depth0), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.pagePath : depth0), depth0))
    + "\" data-backdrop=\"static\" data-keyboard=\"false\"\r\n                            class=\"contact people-connect btn-modal pcfLink modal-open\" title=\"\">\r\n                            "
    + escapeExpression(lambda((depth0 != null ? depth0.contactFormLinkCopy : depth0), depth0))
    + "\r\n                            </span>\r\n                        </span>\r\n                    </div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<div class=\"contact-tabs-item col-md-12 promotional-cell-hover\">\r\n    <a class=\"contact-cta-wrapper\" href=\""
    + escapeExpression(lambda((depth0 != null ? depth0.pagePath : depth0), depth0))
    + "\" title=\""
    + escapeExpression(lambda((depth0 != null ? depth0.jobTitle : depth0), depth0))
    + "\">\r\n        <div class=\"col-md-4\">\r\n            <img src=\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 237 158'%2F%3E\"\r\n            data-mobile=\""
    + escapeExpression(lambda((depth0 != null ? depth0.assetDomainName : depth0), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.contactProfile : depth0), depth0))
    + "/jcr:content/renditions/cq5dam.web.512.341.jpg\"\r\n            data-desktop=\""
    + escapeExpression(lambda((depth0 != null ? depth0.assetDomainName : depth0), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.contactProfile : depth0), depth0))
    + "/jcr:content/renditions/cq5dam.web.237.158.jpg\"\r\n            class=\"img-responsive lazy\" alt=\"connections item image\"/>\r\n        </div>\r\n        <div class=\"col-md-8 ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.peopleContactFormLink : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\r\n            <h3 class=\"secondary-head\">\r\n                "
    + escapeExpression(lambda((depth0 != null ? depth0.salutation : depth0), depth0))
    + " "
    + escapeExpression(lambda((depth0 != null ? depth0.firstName : depth0), depth0))
    + " "
    + escapeExpression(lambda((depth0 != null ? depth0.middleInitial : depth0), depth0))
    + " "
    + escapeExpression(lambda((depth0 != null ? depth0.lastName : depth0), depth0))
    + " "
    + escapeExpression(lambda((depth0 != null ? depth0.suffix : depth0), depth0))
    + "\r\n            </h3>\r\n            <p>"
    + escapeExpression(lambda((depth0 != null ? depth0.jobTitle : depth0), depth0))
    + "</p>\r\n            <p>"
    + escapeExpression(lambda((depth0 != null ? depth0.description : depth0), depth0))
    + "</p>\r\n            <div class=\"row desktop-only access-container\">\r\n                <div class=\"contactFmLink \">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.peopleContactFormLink : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"contactFmLink \">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.peopleContactFormLink : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                </div>\r\n            </div>\r\n        </div>\r\n    </a>\r\n</div>\r\n";
},"useData":true});



this["Handlebars"]["templates"]["affiliatedto"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<div class=\"contact-tabs-item col-md-12 promotional-cell-hover\">\r\n    <a class=\"contact-cta-wrapper\" href=\""
    + escapeExpression(lambda((depth0 != null ? depth0.url : depth0), depth0))
    + "\" title=\""
    + escapeExpression(lambda((depth0 != null ? depth0.jcrTitle : depth0), depth0))
    + "\">\r\n        <div class=\"col-md-4\">\r\n            <img src=\""
    + escapeExpression(lambda((depth0 != null ? depth0.imageFileReference : depth0), depth0))
    + "data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 237 158'%2F%3E\"\r\n            alt=\""
    + escapeExpression(lambda((depth0 != null ? depth0.imageAltText : depth0), depth0))
    + "\" data-mobile=\""
    + escapeExpression(lambda((depth0 != null ? depth0.assetDomainName : depth0), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.imageFileReference : depth0), depth0))
    + "/jcr:content/renditions/cq5dam.web.512.341.jpg\"\r\n            data-desktop=\""
    + escapeExpression(lambda((depth0 != null ? depth0.assetDomainName : depth0), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.imageFileReference : depth0), depth0))
    + "/jcr:content/renditions/cq5dam.web.237.158.jpg\"\r\n            class=\"img-responsive lazy\"/>\r\n        </div>\r\n        <div class=\"col-md-8\">\r\n            <h3 class=\"secondary-head\">"
    + escapeExpression(lambda((depth0 != null ? depth0.jcrTitle : depth0), depth0))
    + "</h3>\r\n            <p class=\"publication-date\">"
    + escapeExpression(lambda((depth0 != null ? depth0.publishDate : depth0), depth0))
    + "</p>\r\n            <p class=\"short-description\">"
    + escapeExpression(lambda((depth0 != null ? depth0.jcrShortDescription : depth0), depth0))
    + "</p>\r\n        </div>\r\n    </a>\r\n</div>\r\n";
},"useData":true});



this["Handlebars"]["templates"]["quickView"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return " "
    + escapeExpression(lambda((depth0 != null ? depth0.translatedCTAURL : depth0), depth0))
    + " ";
},"3":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return " "
    + escapeExpression(lambda((depth0 != null ? depth0.detailURL : depth0), depth0))
    + " ";
},"5":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "             <div class=\"downloadContainer\">\r\n                <div class=\"download\">\r\n                   <a class=\"component-link\" href=\""
    + escapeExpression(lambda((depth0 != null ? depth0.pdfURL : depth0), depth0))
    + "\" target=\"_blank\" title=\"Download PDF\">\r\n                   <span class=\"icon-pdf\"></span>\r\n                   download PDF ("
    + escapeExpression(lambda((depth0 != null ? depth0.pdfSize : depth0), depth0))
    + ")\r\n                   </a>\r\n                </div>\r\n             </div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<div class=\"modalBodyLeft\">\r\n    <div class=\"imgContainer\">\r\n        <a href=\"";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.translatedCTAURL : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" title=\""
    + escapeExpression(lambda((depth0 != null ? depth0.imageAltText : depth0), depth0))
    + "\" tabindex=\"-1\">\r\n            <img src=\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 237 158'%2F%3E\" data-src=\"\" alt=\""
    + escapeExpression(lambda((depth0 != null ? depth0.imageAltText : depth0), depth0))
    + "\" data-mobile=\""
    + escapeExpression(lambda((depth0 != null ? depth0.assetDomainName : depth0), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.imageFileReference : depth0), depth0))
    + "/jcr:content/renditions/cq5dam.web.512.341.jpg\" data-desktop=\""
    + escapeExpression(lambda((depth0 != null ? depth0.assetDomainName : depth0), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.imageFileReference : depth0), depth0))
    + "/jcr:content/renditions/cq5dam.web.237.158.jpg\" class=\"img-responsive lazy\"></a>\r\n    </div>\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.pdfURL : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    <div class=\"shareContainer\">\r\n      <div class=\"share\">\r\n         <a class=\"share-component\" id=\"contact-tab-quickview\" href=\"javascript:void(0);\" title=\"Share\" onclick='javascript:showShareUI({\r\n            \"shareTitle\": \""
    + escapeExpression(lambda((depth0 != null ? depth0.title : depth0), depth0))
    + "\",\r\n            \"shareUrl\": \""
    + escapeExpression(lambda((depth0 != null ? depth0.assetDomainName : depth0), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.detailURL : depth0), depth0))
    + "\",\r\n            \"shareSiteName\": \""
    + escapeExpression(lambda((depth0 != null ? depth0.shareSiteName : depth0), depth0))
    + "\",\r\n            \"shareLanguage\": \""
    + escapeExpression(lambda((depth0 != null ? depth0.contactCountry : depth0), depth0))
    + "\",\r\n            \"shareImage\": \""
    + escapeExpression(lambda((depth0 != null ? depth0.assetDomainName : depth0), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.imageFileReference : depth0), depth0))
    + "\",\r\n            \"shareDescription\": \""
    + escapeExpression(lambda((depth0 != null ? depth0.shortDescription : depth0), depth0))
    + "\",\r\n            \"shareOperationMode\": \"simpleShare\",\r\n            \"shareTarget\" : \"contact-tab-quickview\",\r\n            \"twitterDefaultText\" : \""
    + escapeExpression(lambda((depth0 != null ? depth0.twitterDefaultText : depth0), depth0))
    + "\",\r\n            \"shareEnabledProviders\" : \""
    + escapeExpression(lambda((depth0 != null ? depth0.shareEnabledProviders : depth0), depth0))
    + "\"\r\n            })'>\r\n         <span class=\"icon-share\"></span>\r\n         <span class=\"component-link\">Share</span>\r\n         </a>\r\n      </div>\r\n   </div>\r\n</div>\r\n<div class=\"modalBodyRight\">\r\n    <div class=\"insightsContent\">\r\n        <span class=\"icon-"
    + escapeExpression(lambda((depth0 != null ? depth0.contentIcon : depth0), depth0))
    + " quickViewIcon\"></span>\r\n        <h3 class=\"secondary-head\"><a href=\"";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.translatedCTAURL : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\">"
    + escapeExpression(lambda((depth0 != null ? depth0.title : depth0), depth0))
    + "</a></h3>\r\n        <p class=\"quickview-article-date\">"
    + escapeExpression(lambda((depth0 != null ? depth0.articleDate : depth0), depth0))
    + "</p>\r\n        <p class=\"description\">"
    + escapeExpression(lambda((depth0 != null ? depth0.description : depth0), depth0))
    + "</p>\r\n    </div>\r\n\r\n</div>\r\n";
},"useData":true});



this["Handlebars"]["templates"]["quickView-connections"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "         <p class=\"peopleDetails\">"
    + escapeExpression(lambda((depth0 != null ? depth0.jobTitle : depth0), depth0))
    + "</p>\r\n";
},"3":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "         <p class=\"peopleDetails\">"
    + escapeExpression(lambda((depth0 != null ? depth0.memberFirm : depth0), depth0))
    + "</p>\r\n";
},"5":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "         <p class=\"description\">"
    + escapeExpression(lambda((depth0 != null ? depth0.description : depth0), depth0))
    + "</p>\r\n";
},"7":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "         <div class=\"pull-right\">\r\n            <span class=\"icon-chevron-right \"></span>\r\n            <span data-modal-url=\"/etc/partials/kpmgpublic/peoplecontactform/peoplecontactform.html\" data-backdrop=\"static\" data-keyboard=\"false\" data-remote=\""
    + escapeExpression(lambda((depth0 != null ? depth0.peopleContactFormLink : depth0), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.pagePath : depth0), depth0))
    + "\"  class=\"contact people-connect btn-modal component-data-link modal-inside-modal\" id=\"peoplecontactlink\" tabindex=\"0\">"
    + escapeExpression(lambda((depth0 != null ? depth0.contactFormLinkCopy : depth0), depth0))
    + "</span>\r\n         </div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<div class=\"modalBodyLeft\">\r\n   <div class=\"imgContainer\">\r\n      <a href=\""
    + escapeExpression(lambda((depth0 != null ? depth0.pagePath : depth0), depth0))
    + "\" title=\""
    + escapeExpression(lambda((depth0 != null ? depth0.alt : depth0), depth0))
    + "\" tabindex=\"-1\"><img src=\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 237 158'%2F%3E\" data-src=\"\" data-desktop=\""
    + escapeExpression(lambda((depths[1] != null ? depths[1].assetDomainName : depths[1]), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.contactProfile : depth0), depth0))
    + "/jcr:content/renditions/cq5dam.web.237.158.jpg\" data-mobile=\""
    + escapeExpression(lambda((depths[1] != null ? depths[1].assetDomainName : depths[1]), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.contactProfile : depth0), depth0))
    + "/jcr:content/renditions/cq5dam.web.512.341.jpg\" alt=\""
    + escapeExpression(lambda((depth0 != null ? depth0.alt : depth0), depth0))
    + "\" class=\"img-responsive lazy\"/></a>\r\n   </div>\r\n</div>\r\n<div class=\"modalBodyRight\">\r\n   <div class=\"peopleContactDetails\">\r\n      <p class=\"peopleDetails\"><a href=\""
    + escapeExpression(lambda((depth0 != null ? depth0.pagePath : depth0), depth0))
    + "\" title=\""
    + escapeExpression(lambda((depth0 != null ? depth0.alt : depth0), depth0))
    + "\">"
    + escapeExpression(lambda((depth0 != null ? depth0.salutation : depth0), depth0))
    + " "
    + escapeExpression(lambda((depth0 != null ? depth0.firstName : depth0), depth0))
    + " "
    + escapeExpression(lambda((depth0 != null ? depth0.middleInitial : depth0), depth0))
    + " "
    + escapeExpression(lambda((depth0 != null ? depth0.lastName : depth0), depth0))
    + " "
    + escapeExpression(lambda((depth0 != null ? depth0.suffix : depth0), depth0))
    + "</a></p>\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.jobTitle : depth0), {"name":"if","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.memberFirm : depth0), {"name":"if","hash":{},"fn":this.program(3, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.description : depth0), {"name":"if","hash":{},"fn":this.program(5, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.peopleContactFormLink : depth0), {"name":"if","hash":{},"fn":this.program(7, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "   </div>\r\n\r\n</div>";
},"useData":true,"useDepths":true});



this["Handlebars"]["templates"]["tombstonegallery"] = Handlebars.template({"1":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "    <div class=\" image-gallery-column col-md-3 col-md-height col-sm-height col-full-height col-top\">\r\n        <div class=\"item\">\r\n            <div href=\"#image-quick-view\" class=\"btn-modal\" title=\""
    + escapeExpression(lambda((depth0 != null ? depth0.imageTitles : depth0), depth0))
    + "\">\r\n           <img src=\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 237 237'%2F%3E\" data-image=\""
    + escapeExpression(lambda((depths[1] != null ? depths[1].assetDomainName : depths[1]), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.thumbnail : depth0), depth0))
    + "\"  alt=\""
    + escapeExpression(lambda((depth0 != null ? depth0.imageAltTitles : depth0), depth0))
    + "\" data-desktop=\""
    + escapeExpression(lambda((depths[1] != null ? depths[1].assetDomainName : depths[1]), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.thumbnail : depth0), depth0))
    + "/jcr:content/renditions/cq5dam.web.237.237."
    + escapeExpression(lambda((depth0 != null ? depth0.fileType : depth0), depth0))
    + "\" data-mobile=\""
    + escapeExpression(lambda((depths[1] != null ? depths[1].assetDomainName : depths[1]), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.thumbnail : depth0), depth0))
    + "/jcr:content/renditions/cq5dam.web.424.424."
    + escapeExpression(lambda((depth0 != null ? depth0.fileType : depth0), depth0))
    + "\" class=\"img-responsive lazy gallery-image\" />\r\n            </div>\r\n            <div class=\"item-info\">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.imageTitles : depth0), {"name":"if","hash":{},"fn":this.program(2, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </div>\r\n        </div>\r\n    </div>\r\n";
},"2":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                	<h4 class=\"item-header line-clamp line-clamp-4\">"
    + escapeExpression(lambda((depth0 != null ? depth0.imageTitles : depth0), depth0))
    + "</h4>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, buffer = "<div class=\"row row-same-height row-full-height\">\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.results : depth0), {"name":"each","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>";
},"useData":true,"useDepths":true});



this["Handlebars"]["templates"]["facets"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "  <li class=\"facetFilters date "
    + escapeExpression(lambda((depth0 != null ? depth0['category-hide'] : depth0), depth0))
    + "\">\r\n";
},"3":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "  <li class=\"facetFilters "
    + escapeExpression(lambda((depth0 != null ? depth0['facet-title'] : depth0), depth0))
    + " "
    + escapeExpression(lambda((depth0 != null ? depth0['category-hide'] : depth0), depth0))
    + " \" >\r\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "         "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1.KPMG_Filter_Year : stack1), depth0))
    + "\r\n";
},"7":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "         "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1.KPMG_Cont_Type_Path : stack1), depth0))
    + "\r\n";
},"9":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1.KPMG_Geo_Rel_Path : stack1), depth0))
    + "\r\n";
},"11":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1.KPMG_Market_Path : stack1), depth0))
    + "\r\n";
},"13":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1.KPMG_Service_Pth_Loc : stack1), depth0))
    + "\r\n";
},"15":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1.KPMG_Service_Path : stack1), depth0))
    + "\r\n";
},"17":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1.KPMG_Topic_Path : stack1), depth0))
    + "\r\n";
},"19":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1.KPMG_Ind_Path_Loc : stack1), depth0))
    + "\r\n";
},"21":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1.KPMG_Ind_Path : stack1), depth0))
    + "\r\n";
},"23":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1.KPMG_EVENT_MEM_FIRM : stack1), depth0))
    + "\r\n";
},"25":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1.KPMG_Event_Mem_Firm : stack1), depth0))
    + "\r\n";
},"27":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1.KPMG_Cont_Mem_Firm : stack1), depth0))
    + "\r\n";
},"29":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1.KPMG_FILTER_YEAR : stack1), depth0))
    + "\r\n";
},"31":function(depth0,helpers,partials,data,depths) {
  var stack1, buffer = "\r\n         \r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['facet-children'] : depth0), {"name":"if","hash":{},"fn":this.program(32, data, depths),"inverse":this.program(37, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['facet-selected'] : depth0), {"name":"if","hash":{},"fn":this.program(39, data, depths),"inverse":this.program(41, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['facet-selected'] : depth0), {"name":"if","hash":{},"fn":this.program(43, data, depths),"inverse":this.program(51, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['facet-children'] : depth0), {"name":"if","hash":{},"fn":this.program(57, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "         </li>\r\n";
},"32":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, lambda=this.lambda, buffer = "         <li class=\"";
  stack1 = ((helpers.moreItemsCheck || (depth0 && depth0.moreItemsCheck) || helperMissing).call(depth0, (data && data.index), {"name":"moreItemsCheck","hash":{},"fn":this.program(33, data),"inverse":this.program(35, data),"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += " has-nested ";
  stack1 = lambda((depth0 != null ? depth0['facet-hide'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\" >\r\n";
},"33":function(depth0,helpers,partials,data) {
  return " LT5Facets ";
  },"35":function(depth0,helpers,partials,data) {
  return " GT5Facets ";
  },"37":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, lambda=this.lambda, buffer = "         <li class=\"";
  stack1 = ((helpers.moreItemsCheck || (depth0 && depth0.moreItemsCheck) || helperMissing).call(depth0, (data && data.index), {"name":"moreItemsCheck","hash":{},"fn":this.program(33, data),"inverse":this.program(35, data),"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += " ";
  stack1 = lambda((depth0 != null ? depth0['facet-hide'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\" >\r\n";
},"39":function(depth0,helpers,partials,data) {
  return "              <span class=\"icon-checkmark mblCheckmark\"></span>\r\n";
  },"41":function(depth0,helpers,partials,data) {
  return "              <span class=\"icon-checkmark mblCheckmark visibilty-hidden\"></span>\r\n";
  },"43":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "                  <label class=\"facetsCheckbox checked\">\r\n                  <input type=\"checkbox\" class=\"facetBox\" "
    + escapeExpression(lambda((depth0 != null ? depth0.disabled : depth0), depth0))
    + "  value=\"";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-link=\""
    + escapeExpression(lambda((depth0 != null ? depth0.undolink : depth0), depth0))
    + "\" data-title=\"";
  stack1 = lambda((depths[2] != null ? depths[2]['facet-title'] : depths[2]), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-key=\"";
  stack1 = lambda((depths[2] != null ? depths[2]['facet-key'] : depths[2]), depth0);
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depths[2] != null ? depths[2]['facet-has-children'] : depths[2]), {"name":"if","hash":{},"fn":this.program(44, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\"  data-name=\"";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" checked>\r\n\r\n";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-name'] : depth0), "eqi", "All", {"name":"compare","hash":{},"fn":this.program(46, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-name'] : depth0), "neq", "All", {"name":"compare","hash":{},"fn":this.program(48, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                  </label>\r\n\r\n";
},"44":function(depth0,helpers,partials,data,depths) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda((depths[3] != null ? depths[3]['parent-suffix'] : depths[3]), depth0));
  },"46":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, buffer = "                    <span class=\"facetName\">";
  stack1 = lambda(((stack1 = (depths[3] != null ? depths[3]['facet-values'] : depths[3])) != null ? stack1.ALL_TEXT : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span>\r\n";
},"48":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, buffer = "                    <span class=\"facetName\">";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "</span>\r\n                  \r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['facet-children'] : depth0), {"name":"if","hash":{},"fn":this.program(49, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                    \r\n";
},"49":function(depth0,helpers,partials,data) {
  return "                      <span class=\"icon-chevron-down pull-right nestedFacetsToogleBtn\" tabindex=\"0\"></span>\r\n";
  },"51":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "                  <label class=\"facetsCheckbox\">\r\n                  <input type=\"checkbox\" class=\"facetBox\" "
    + escapeExpression(lambda((depth0 != null ? depth0.disabled : depth0), depth0))
    + " value=\"";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\"  data-link=\""
    + escapeExpression(lambda((depth0 != null ? depth0.link : depth0), depth0))
    + "\" data-title=\"";
  stack1 = lambda((depths[2] != null ? depths[2]['facet-title'] : depths[2]), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-key=\"";
  stack1 = lambda((depths[2] != null ? depths[2]['facet-key'] : depths[2]), depth0);
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depths[2] != null ? depths[2]['facet-has-children'] : depths[2]), {"name":"if","hash":{},"fn":this.program(44, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-name=\"";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\r\n                  \r\n";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-name'] : depth0), "eqi", "All", {"name":"compare","hash":{},"fn":this.program(52, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-name'] : depth0), "neq", "All", {"name":"compare","hash":{},"fn":this.program(54, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                  </label>\r\n";
},"52":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, buffer = "                     <span class=\"facetName\">";
  stack1 = lambda(((stack1 = (depths[3] != null ? depths[3]['facet-values'] : depths[3])) != null ? stack1.ALL_TEXT : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span>\r\n";
},"54":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, buffer = "                    <span class=\"facetName\">";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "</span>\r\n\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['facet-children'] : depth0), {"name":"if","hash":{},"fn":this.program(55, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n";
},"55":function(depth0,helpers,partials,data) {
  return "                    <span class=\"icon-chevron-down pull-right nestedFacetsToogleBtn\" tabindex=\"0\"></span>\r\n";
  },"57":function(depth0,helpers,partials,data,depths) {
  var stack1, buffer = "            \r\n            <ul class=\"nestedFacets\">\r\n";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 != null ? depth0['facet-children'] : depth0)) != null ? stack1['facet-child'] : stack1), {"name":"each","hash":{},"fn":this.program(58, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </ul>\r\n";
},"58":function(depth0,helpers,partials,data,depths) {
  var stack1, buffer = "               <li class=\"LT5Facets\">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['facet-selected'] : depth0), {"name":"if","hash":{},"fn":this.program(59, data, depths),"inverse":this.program(68, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "               </li>\r\n";
},"59":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['facet-selected'] : depth0), {"name":"if","hash":{},"fn":this.program(60, data, depths),"inverse":this.program(62, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                  <label class=\"facetsCheckbox checked\">\r\n                  <input type=\"checkbox\" class=\"facetBox\"  value=\"";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-link=\""
    + escapeExpression(lambda((depth0 != null ? depth0.undolink : depth0), depth0))
    + "\" data-parent=\"";
  stack1 = lambda((depths[2] != null ? depths[2]['facet-name'] : depths[2]), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-title=\"";
  stack1 = lambda((depths[4] != null ? depths[4]['facet-title'] : depths[4]), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-key=\"";
  stack1 = lambda((depths[4] != null ? depths[4]['facet-key'] : depths[4]), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += escapeExpression(lambda((depths[4] != null ? depths[4]['child-suffix'] : depths[4]), depth0))
    + "\" data-name=\"";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" checked>\r\n";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-name'] : depth0), "eqi", ((stack1 = (depths[2] != null ? depths[2]['facet-values'] : depths[2])) != null ? stack1.ALL_TEXT : stack1), {"name":"compare","hash":{},"fn":this.program(64, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-name'] : depth0), "neq", ((stack1 = (depths[2] != null ? depths[2]['facet-values'] : depths[2])) != null ? stack1.ALL_TEXT : stack1), {"name":"compare","hash":{},"fn":this.program(66, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"60":function(depth0,helpers,partials,data) {
  return "                    <span class=\"icon-checkmark mblCheckmark\"></span>\r\n";
  },"62":function(depth0,helpers,partials,data) {
  return "                     <span class=\"icon-checkmark mblCheckmark visibilty-hidden\"></span>\r\n";
  },"64":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, buffer = "                     <span class=\"facetName\">";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span></label>\r\n";
},"66":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, buffer = "                    <span class=\"facetName\">";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span></label>\r\n";
},"68":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "                  <span class=\"icon-checkmark mblCheckmark visibilty-hidden\"></span>\r\n                  <label class=\"facetsCheckbox\">\r\n                  <input type=\"checkbox\" class=\"facetBox\" value=\"";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\"  data-link=\""
    + escapeExpression(lambda((depth0 != null ? depth0.link : depth0), depth0))
    + "\" data-parent=\"";
  stack1 = lambda((depths[2] != null ? depths[2]['facet-name'] : depths[2]), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-title=\"";
  stack1 = lambda((depths[4] != null ? depths[4]['facet-title'] : depths[4]), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-key=\"";
  stack1 = lambda((depths[4] != null ? depths[4]['facet-key'] : depths[4]), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += escapeExpression(lambda((depths[4] != null ? depths[4]['child-suffix'] : depths[4]), depth0))
    + "\" data-name=\"";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\r\n                  <span class=\"facetName\">";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span></label>\r\n";
},"70":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "   <div class=\"moreFacets\">\r\n      <span class=\"icon-chevron-down\"></span>\r\n      <a class=\"component-link moreFacetsLink\" data-more=\"more-topics\"  title=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1.more : stack1), depth0))
    + "\" href=\"javascript:void(0);\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1.more : stack1), depth0))
    + "</a>\r\n   </div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-title'] : depth0), "eq", "KPMG_Filter_Year", {"name":"compare","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-title'] : depth0), "neq", "KPMG_Filter_Year", {"name":"compare","hash":{},"fn":this.program(3, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n   <h4 class=\"component-head\"><span class=\"facetTitle\">\r\n";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-title'] : depth0), "eq", "KPMG_Filter_Year", {"name":"compare","hash":{},"fn":this.program(5, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-title'] : depth0), "eq", "KPMG_Cont_Type_Path", {"name":"compare","hash":{},"fn":this.program(7, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-title'] : depth0), "eq", "KPMG_Geo_Rel_Path", {"name":"compare","hash":{},"fn":this.program(9, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-title'] : depth0), "eq", "KPMG_Market_Path", {"name":"compare","hash":{},"fn":this.program(11, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-title'] : depth0), "eq", "KPMG_Service_Pth_Loc", {"name":"compare","hash":{},"fn":this.program(13, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-title'] : depth0), "eq", "KPMG_Service_Path", {"name":"compare","hash":{},"fn":this.program(15, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-title'] : depth0), "eq", "KPMG_Topic_Path", {"name":"compare","hash":{},"fn":this.program(17, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-title'] : depth0), "eq", "KPMG_Ind_Path_Loc", {"name":"compare","hash":{},"fn":this.program(19, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-title'] : depth0), "eq", "KPMG_Ind_Path", {"name":"compare","hash":{},"fn":this.program(21, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-title'] : depth0), "eq", "KPMG_EVENT_MEM_FIRM", {"name":"compare","hash":{},"fn":this.program(23, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-title'] : depth0), "eq", "KPMG_Event_Mem_Firm", {"name":"compare","hash":{},"fn":this.program(25, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-title'] : depth0), "eq", "KPMG_Cont_Mem_Firm", {"name":"compare","hash":{},"fn":this.program(27, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-title'] : depth0), "eq", "KPMG_FILTER_YEAR", {"name":"compare","hash":{},"fn":this.program(29, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "   </span> <span class=\"icon-chevron-up\"></span></h4>\r\n   <div class=\"facetsContainer\">\r\n      <ul class=\"facetsOptions\">\r\n";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1['facet-item'] : stack1), {"name":"each","hash":{},"fn":this.program(31, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "      </ul>\r\n      <div class=\"dottedLine\"></div>\r\n   </div>\r\n";
  stack1 = ((helpers.moreFacetsCheck || (depth0 && depth0.moreFacetsCheck) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1['facet-item'] : stack1), {"name":"moreFacetsCheck","hash":{},"fn":this.program(70, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</li>";
},"useData":true,"useDepths":true});



this["Handlebars"]["templates"]["resultSet"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "        <div class=\"badge\">\r\n            <span class=\"icon-star-badge\"></span>\r\n        </div>\r\n";
  },"3":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "            <h3 class=\"alt-secondary-head tertiary-trapezoid-bg image-title\">\r\n                <span>\r\n                    "
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Contact_FN : depth0), depth0))
    + " "
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Contact_LN : depth0), depth0))
    + "\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.KPMG_Contact_City : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.program(6, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                </span>\r\n            </h3>\r\n";
},"4":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    &#124; "
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Contact_City : depth0), depth0))
    + ", "
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Contact_Country : depth0), depth0))
    + "\r\n";
},"6":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    &#124; "
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Contact_Country : depth0), depth0))
    + "\r\n";
},"8":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <p class=\"peopleDetails\">"
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Contact_Job_Ttl : depth0), depth0))
    + "</p>\r\n";
},"10":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <span class=\"icon-date "
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Cont_Type_Path : depth0), depth0))
    + " icon\"></span>\r\n";
},"12":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0.KPMG_Tab_Type : depth0), "neq", "people", {"name":"compare","hash":{},"fn":this.program(13, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"13":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0.KPMG_Tab_Type : depth0), "neq", "People", {"name":"compare","hash":{},"fn":this.program(14, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"14":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <span class=\"icon-"
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Article_Primary_Format : depth0), depth0))
    + " icon\"></span>\r\n";
},"16":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <p class=\"contact-tabs-date contact-tabs-date-insights\">"
    + escapeExpression(((helpers.formatDate || (depth0 && depth0.formatDate) || helperMissing).call(depth0, (depth0 != null ? depth0.KPMG_Article_Date : depth0), {"name":"formatDate","hash":{},"data":data})))
    + "</p>\r\n";
},"18":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.KPMG_Event_Start_Date : depth0), {"name":"if","hash":{},"fn":this.program(19, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"19":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <p class=\"contact-tabs-date\">"
    + escapeExpression(((helpers.formatDate || (depth0 && depth0.formatDate) || helperMissing).call(depth0, (depth0 != null ? depth0.KPMG_Event_Start_Date : depth0), {"name":"formatDate","hash":{},"data":data})))
    + "</p>\r\n";
},"21":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <p class=\"contact-tabs-date event-type\">"
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Event_Type : depth0), depth0))
    + "</p>\r\n";
},"23":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    <div class=\"cta-space\">&nbsp;</div>\r\n                    <div class=\" pull-right\">\r\n                        <span class=\"btn-cta contact-btn\" tabindex=\"0\">\r\n                            <span class=\"icon-email\"></span>\r\n                            <span data-modal-url=\"/etc/partials/kpmgpublic/peoplecontactform/peoplecontactform.html\" data-backdrop=\"static\" data-keyboard=\"false\" data-remote=\""
    + escapeExpression(lambda((depth0 != null ? depth0.peopleContactFormLink : depth0), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_URL : depth0), depth0))
    + "\" class=\"contact people-connect btn-modal pcfLink component-data-link modal-open\">"
    + escapeExpression(lambda((depth0 != null ? depth0.contactFormLinkCopy : depth0), depth0))
    + "</span>\r\n                        </span>\r\n                    </div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, buffer = "<a title=\""
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Title : depth0), depth0))
    + "\" href=\""
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_URL : depth0), depth0))
    + "\">\r\n    <div class=\"result "
    + escapeExpression(lambda((depth0 != null ? depth0.resultsView : depth0), depth0))
    + " col-md-height col-sm-height col-full-height\" tabindex=\"0\">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.favourite : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        <div class=\"imgContainer\">\r\n            <img src=\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 237 158'%2F%3E\" data-src=\"\" data-desktop=\""
    + escapeExpression(((helper = (helper = helpers.assetDomainName || (depth0 != null ? depth0.assetDomainName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"assetDomainName","hash":{},"data":data}) : helper)))
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Image : depth0), depth0))
    + "/jcr:content/renditions/cq5dam.web.237.158.jpg\" data-mobile=\""
    + escapeExpression(((helper = (helper = helpers.assetDomainName || (depth0 != null ? depth0.assetDomainName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"assetDomainName","hash":{},"data":data}) : helper)))
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Image : depth0), depth0))
    + "/jcr:content/renditions/cq5dam.web.512.341.jpg\" alt=\""
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Title : depth0), depth0))
    + "\" class=\"img-responsive lazy\" />\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.KPMG_Contact_FN : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        </div>\r\n        <div class=\"textContainer\">\r\n            <h3 class=\"secondary-head line-clamp line-clamp-3\"><p> "
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Title : depth0), depth0))
    + " </p></h3>\r\n";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0.KPMG_Tab_Type : depth0), "eqi", "people", {"name":"compare","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0.KPMG_Tab_Type : depth0), "eqi", "events", {"name":"compare","hash":{},"fn":this.program(10, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0.KPMG_Tab_Type : depth0), "neq", "events", {"name":"compare","hash":{},"fn":this.program(12, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.KPMG_Article_Date : depth0), {"name":"if","hash":{},"fn":this.program(16, data),"inverse":this.program(18, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.KPMG_Event_Type : depth0), {"name":"if","hash":{},"fn":this.program(21, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n            <p class=\"description line-clamp line-clamp-5\">"
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Short_Desc : depth0), depth0))
    + "</p>\r\n\r\n            <div class=\"row\">\r\n                <div class=\"contactFmLink\">\r\n";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0.KPMG_Tab_Type : depth0), "eqi", "people", {"name":"compare","hash":{},"fn":this.program(23, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                </div>\r\n                <div class=\" quickView desktop-only\">\r\n                    <div class=\"cta-space\">&nbsp;</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</a>\r\n";
},"useData":true});



this["Handlebars"]["templates"]["searchHeader"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<div class=\"resultFound\">\r\n  \r\n   <div class=\"noDataFound\">\r\n      <p>"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.CQModel : depth0)) != null ? stack1.i18nModel : stack1)) != null ? stack1.noResultsCopy : stack1), depth0))
    + "</p>\r\n      <h3>Suggestions</h3>\r\n      <p>"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.CQModel : depth0)) != null ? stack1.i18nModel : stack1)) != null ? stack1.noResultsCopyLineOne : stack1), depth0))
    + "</p>\r\n      <p>"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.CQModel : depth0)) != null ? stack1.i18nModel : stack1)) != null ? stack1.noResultsCopyLineTwo : stack1), depth0))
    + "</p>\r\n      <p>"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.CQModel : depth0)) != null ? stack1.i18nModel : stack1)) != null ? stack1.noResultsCopyLineThree : stack1), depth0))
    + "</p>\r\n   </div>\r\n</div>\r\n<div class=\"sortByContainer\">\r\n   <div class=\"sortBy\">\r\n   <div class=\"refineButton\">\r\n         <span class=\"icon-chevron-right\"></span>\r\n         <span class=\"component-link facets-refine-btn\" href=\"#\" title=\"REFINE SEARCH\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.CQModel : depth0)) != null ? stack1.i18nModel : stack1)) != null ? stack1.title : stack1), depth0))
    + "</span>\r\n      </div>\r\n   </div>\r\n</div>";
},"useData":true});



this["Handlebars"]["templates"]["partnerresults"] = Handlebars.template({"1":function(depth0,helpers,partials,data,depths) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<div class=\"partner-item col-md-12 col-xs-12\" tabindex=\"0\">\r\n    <div class=\"col-md-12 col-xs-12 no-padding\">\r\n        <div class=\"col-md-10 col-xs-10 contactNameContainer no-padding\">\r\n            <a target=\"_blank\" href=\""
    + escapeExpression(lambda((depth0 != null ? depth0.translatedCTAURL : depth0), depth0))
    + "\">\r\n                <span class=\"contact-name\">"
    + escapeExpression(lambda((depth0 != null ? depth0.contactFirstName : depth0), depth0))
    + " "
    + escapeExpression(lambda((depth0 != null ? depth0.contactLastName : depth0), depth0))
    + "</span>\r\n            </a>\r\n        </div>\r\n        <div class=\"col-md-2 col-xs-2 messageIcon no-padding\">\r\n            <span id=\""
    + escapeExpression(lambda((depth0 != null ? depth0.contactFirstName : depth0), depth0))
    + "-"
    + escapeExpression(lambda((depth0 != null ? depth0.contactLastName : depth0), depth0))
    + "\" class=\"component-data-link people-connect btn-modal icon-email\" data-toggle=\"modal\" data-target=\"#kpmgModal\" \r\n            data-modal-url=\"/etc/partials/kpmgpublic/peoplecontactform/peoplecontactform.html\" data-backdrop=\"static\" data-keyboard=\"false\"\r\n            data-remote=\""
    + escapeExpression(lambda((depths[1] != null ? depths[1].localePath : depths[1]), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.translatedCTAURL : depth0), depth0))
    + "\" title=\""
    + escapeExpression(lambda((depth0 != null ? depth0.contactPageName : depth0), depth0))
    + "\" tabindex=\"0\" role=\"button\">\r\n            </span>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-md-12 col-xs-12 no-padding\">\r\n        <span class=\"jobtitle\">"
    + escapeExpression(lambda((depth0 != null ? depth0.jobTitle : depth0), depth0))
    + "</span>\r\n    </div>\r\n</div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.results : depth0), {"name":"each","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true,"useDepths":true});



this["Handlebars"]["templates"]["officelocatorresults"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<div class=\"partner-item col-md-12 col-xs-12\" role=\"button\" tabindex=\"0\">\r\n        <div class=\"officeDetails\">\r\n            <a href=\""
    + escapeExpression(lambda((depth0 != null ? depth0.pagePath : depth0), depth0))
    + "\" target=\"_blank\" class=\"linkTag\"></a>\r\n            <div class=\"col-md-12 col-xs-12 no-padding\">\r\n                <span class=\"icon-location\"></span><span class=\"locationName\">"
    + escapeExpression(lambda((depth0 != null ? depth0.title : depth0), depth0))
    + "</span>\r\n            </div>\r\n            <div class=\"col-md-12 col-xs-12 address\">\r\n                <div>\r\n                    <span>"
    + escapeExpression(lambda((depth0 != null ? depth0.address1 : depth0), depth0))
    + "</span>\r\n                </div>\r\n                <div>\r\n                    <span>"
    + escapeExpression(lambda((depth0 != null ? depth0.address2 : depth0), depth0))
    + "</span>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-12 col-xs-12 no-padding\">\r\n            <p class=\"phone\"><span class=\"icon-dialer dialerIcon\"></span><a href=\"tel:"
    + escapeExpression(lambda((depth0 != null ? depth0.phone : depth0), depth0))
    + "\">"
    + escapeExpression(lambda((depth0 != null ? depth0.phone : depth0), depth0))
    + "</a></p>\r\n        </div>\r\n</div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.results : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});



this["Handlebars"]["templates"]["imagegallery"] = Handlebars.template({"1":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "    <div class=\" image-gallery-column col-md-3 col-md-height col-sm-height col-full-height col-top\">\r\n        <div class=\"item\">\r\n            <div href=\"#image-quick-view\" class=\"btn-modal\"  data-toggle=\"modal\" title=\""
    + escapeExpression(lambda((depth0 != null ? depth0.description : depth0), depth0))
    + "\">\r\n           <img src=\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 237 237'%2F%3E\" data-image=\""
    + escapeExpression(lambda((depths[1] != null ? depths[1].assetDomainName : depths[1]), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.thumbnail : depth0), depth0))
    + "\"  alt=\""
    + escapeExpression(lambda((depth0 != null ? depth0.description : depth0), depth0))
    + "\" data-desktop=\""
    + escapeExpression(lambda((depths[1] != null ? depths[1].assetDomainName : depths[1]), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.thumbnail : depth0), depth0))
    + "/jcr:content/renditions/cq5dam.web.237.237."
    + escapeExpression(lambda((depth0 != null ? depth0.fileType : depth0), depth0))
    + "\" data-mobile=\""
    + escapeExpression(lambda((depths[1] != null ? depths[1].assetDomainName : depths[1]), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.thumbnail : depth0), depth0))
    + "/jcr:content/renditions/cq5dam.web.424.424."
    + escapeExpression(lambda((depth0 != null ? depth0.fileType : depth0), depth0))
    + "\" class=\"img-responsive lazy gallery-image\" />\r\n            </div>\r\n            <div class=\"item-info\">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.title : depth0), {"name":"if","hash":{},"fn":this.program(2, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                <p class=\"item-description\">"
    + escapeExpression(lambda((depth0 != null ? depth0.description : depth0), depth0))
    + "</p>\r\n            </div>\r\n            <div class=\"primary-cta-space\">&nbsp;</div>\r\n            <div class=\"download-container\">\r\n                <a title=\""
    + escapeExpression(lambda((depth0 != null ? depth0.fileType : depth0), depth0))
    + " ("
    + escapeExpression(lambda((depth0 != null ? depth0.fileSize : depth0), depth0))
    + ")\" href=\""
    + escapeExpression(lambda((depths[1] != null ? depths[1].assetDomainName : depths[1]), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.thumbnail : depth0), depth0))
    + "/jcr:content/renditions/original\" target=\"_blank\"><span class=\"icon-download pull-left\"></span>\r\n                   <span class=\"download-label\">"
    + escapeExpression(lambda((depth0 != null ? depth0.downloadLabel : depth0), depth0))
    + "</span>\r\n                   <span class=\"file-type\">"
    + escapeExpression(lambda((depth0 != null ? depth0.fileType : depth0), depth0))
    + "</span>  \r\n                   <span class=\"download-size\">("
    + escapeExpression(lambda((depth0 != null ? depth0.fileSize : depth0), depth0))
    + ")</span>\r\n                </a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n";
},"2":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    <a href=\"#image-quick-view\" data-toggle=\"modal\">\r\n                        <h4 class=\"item-header\">"
    + escapeExpression(lambda((depth0 != null ? depth0.title : depth0), depth0))
    + "</h4>\r\n                    </a>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, buffer = "<div class=\"row tmpl-row row-same-height row-full-height\">\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.results : depth0), {"name":"each","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>";
},"useData":true,"useDepths":true});



this["Handlebars"]["templates"]["imageoverlay"] = Handlebars.template({"1":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "                          <li>\r\n                              <a href=\"javascript:void(0);\">\r\n                                <img src=\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 237 237'%2F%3E\" alt=\""
    + escapeExpression(lambda((depth0 != null ? depth0.imageTitle : depth0), depth0))
    + "\" data-image=\""
    + escapeExpression(lambda((depths[1] != null ? depths[1].assetDomainName : depths[1]), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.thumbnail : depth0), depth0))
    + "\" data-original-path=\"/jcr:content/renditions/original\"  data-overlay-img=\""
    + escapeExpression(lambda((depths[1] != null ? depths[1].assetDomainName : depths[1]), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.thumbnail : depth0), depth0))
    + "/jcr:content/renditions/cq5dam.web.424.424."
    + escapeExpression(lambda((depth0 != null ? depth0.fileType : depth0), depth0))
    + "\"  data-thumbnail=\""
    + escapeExpression(lambda((depths[1] != null ? depths[1].assetDomainName : depths[1]), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.thumbnail : depth0), depth0))
    + "/jcr:content/renditions/cq5dam.web.237.237."
    + escapeExpression(lambda((depth0 != null ? depth0.fileType : depth0), depth0))
    + "\" class=\"lazy\" />                         \r\n                              </a>\r\n                              <div class=\"hidden-data\">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.copyright : depth0), {"name":"if","hash":{},"fn":this.program(2, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                                  <h3 class=\"item-header\">"
    + escapeExpression(lambda((depth0 != null ? depth0.title : depth0), depth0))
    + "</h3>\r\n                                  <p class=\"item-description\">"
    + escapeExpression(lambda((depth0 != null ? depth0.description : depth0), depth0))
    + "</p>\r\n                                  <p class=\"item-download-copy\"><span class=\"icon-download\"></span>\r\n                                      <span class=\"download-label\">"
    + escapeExpression(lambda((depth0 != null ? depth0.downloadLabel : depth0), depth0))
    + "</span>\r\n                                      <span class=\"file-type\">"
    + escapeExpression(lambda((depth0 != null ? depth0.fileType : depth0), depth0))
    + "</span>  \r\n                                      <span class=\"download-size\">("
    + escapeExpression(lambda((depth0 != null ? depth0.fileSize : depth0), depth0))
    + ")</span>\r\n                                  </p>\r\n                              </div>	\r\n                          </li>\r\n";
},"2":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                                  <p class=\"copyright-new\">&copy;"
    + escapeExpression(lambda((depth0 != null ? depth0.copyright : depth0), depth0))
    + "</p>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, buffer = "<a href=\"#\" class=\"btn-close\" data-dismiss=\"modal\"><span class=\"icon-close\"><span class=\"sr-only\">close</span></span></a>\r\n<div class=\"modal-content-panel\">\r\n    <div class=\"module-imageoverlay component\">\r\n      <div class=\"row\">\r\n          <div class=\"col-md-12 low-pad\">\r\n            <h3 class=\"gallery-header\"></h3>\r\n          </div>\r\n          <div class=\"col-md-7 left-pad\">\r\n              <img src=\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 424 424'%2F%3E\" alt=\"\" class=\"item-image\" />\r\n          </div>\r\n          <div class=\"col-md-5 low-pad\">\r\n              <div class=\"shown-data\">\r\n                  <h3 class=\"item-header\"></h3>\r\n                  <p class=\"item-description\"></p> \r\n                  <a href=\"\" target=\"_blank\" class=\"item-download\"><span class=\"icon-download\"></span></a>\r\n                  <div class=\"share-container module-share\" >\r\n                      <a id=\"image-sharetooltip\" class=\"share-component share-image-in-gallery\" href=\"javascript:void(0);\">          \r\n                      <span class=\"icon-share\"></span>\r\n                      <span class=\"component-link share-label\"></span>\r\n                  </a> \r\n                  </div>\r\n                 \r\n              </div>\r\n              <div class=\"carousel-copy-text\"></div>\r\n              <div class=\"carousel-container\">\r\n                  <div style=\"overflow: hidden;\" class=\"frame\" id=\"overlay-gallery\">\r\n                      <ul>\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.allRecords : depth0), {"name":"each","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n                      </ul>\r\n                  </div>\r\n\r\n                  <div class=\"controls\">\r\n                      <a href=\"javascript:void(0);\" class=\"prevPage\"><span class=\"icon-carousel-left\"></span></a>\r\n                      <a href=\"javascript:void(0);\" class=\"nextPage\"><span class=\"icon-carousel-right\"></span></a>\r\n                  </div>\r\n                  <div class=\"scrollbar\">\r\n                      <div class=\"handle\">\r\n                          <div class=\"mousearea\"></div>\r\n                      </div>\r\n                  </div>\r\n              </div>\r\n              <div class=\"shown-data-mobile\">\r\n                  <h3 class=\"item-header\"></h3>\r\n                  <p class=\"item-description\"></p>\r\n                  <a href=\"\" target=\"_blank\" class=\"item-download\"><span class=\"icon-download\"></span></a>\r\n                  <div class=\"share-container module-share\"></div>\r\n              </div>                        \r\n             \r\n          </div>\r\n      </div>\r\n       <p class=\"copyright\"></p>\r\n  </div>\r\n";
},"useData":true,"useDepths":true});



this["Handlebars"]["templates"]["subscriptions"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "        <div class=\"optin-wraper\"> \r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.subscriptionPreference : depth0)) != null ? stack1.includeInSite : stack1), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.communicationPreference : depth0)) != null ? stack1.includeInSite : stack1), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        </div>\r\n        \r\n        <div class=\"communication-preferences-search-container\">\r\n            <div class=\"communication-preferences-searchbar\">\r\n                <input id=\"communicationsearchbar\" type=\"text\" placeholder=\""
    + escapeExpression(((helper = (helper = helpers.placeholdertextforfiltersubscriptions || (depth0 != null ? depth0.placeholdertextforfiltersubscriptions : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"placeholdertextforfiltersubscriptions","hash":{},"data":data}) : helper)))
    + "\" autocomplete=\"on\">\r\n            </div>\r\n\r\n            <div class=\"selected-interests-header-text\">"
    + escapeExpression(((helper = (helper = helpers.selectedinterestslist || (depth0 != null ? depth0.selectedinterestslist : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"selectedinterestslist","hash":{},"data":data}) : helper)))
    + "</div>\r\n            <div class=\"communication-preferences-tags\"></div>\r\n        </div>\r\n        <div class=\"communication-preferences-subscribedList\">\r\n            <div class=\"interests-based-subscription-text onboarding\">"
    + escapeExpression(((helper = (helper = helpers.onboardingbasedsubscriptiontitle || (depth0 != null ? depth0.onboardingbasedsubscriptiontitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"onboardingbasedsubscriptiontitle","hash":{},"data":data}) : helper)))
    + "</div>\r\n            <div class=\"interests-based-subscription-text\">"
    + escapeExpression(((helper = (helper = helpers.interestsbasedsubscriptiontitle || (depth0 != null ? depth0.interestsbasedsubscriptiontitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"interestsbasedsubscriptiontitle","hash":{},"data":data}) : helper)))
    + "</div>\r\n            <div id=\"selectedSubscriptionList\"></div>\r\n        </div>\r\n        <div class=\"subscription-list-wraper\">\r\n            <div class=\"subscription-interest-in-title\">"
    + escapeExpression(((helper = (helper = helpers.subscriptionsinterestedintitle || (depth0 != null ? depth0.subscriptionsinterestedintitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"subscriptionsinterestedintitle","hash":{},"data":data}) : helper)))
    + "</div>\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.groupEnabled : depth0), {"name":"if","hash":{},"fn":this.program(6, data),"inverse":this.program(11, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        </div>\r\n        <div class=\"email-checkbox-wrapper ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.isSubscriptionExist : depth0), {"name":"if","hash":{},"fn":this.program(14, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.isSubscriptionExist : depth0), {"name":"if","hash":{},"fn":this.program(16, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            <div class=\"btn-wraper\">\r\n                <button class=\"cancel-btn col-md-5 hidden-xs disable-action\">\r\n                    <span class=\"text\">"
    + escapeExpression(((helper = (helper = helpers.cancelLabel || (depth0 != null ? depth0.cancelLabel : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"cancelLabel","hash":{},"data":data}) : helper)))
    + "</span>\r\n                </button>\r\n                <button class=\"save-changes-btn col-md-12 visible-xs disable-action\">\r\n                    <span class=\"text\">"
    + escapeExpression(((helper = (helper = helpers.saveLabel || (depth0 != null ? depth0.saveLabel : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"saveLabel","hash":{},"data":data}) : helper)))
    + "</span>\r\n                </button>\r\n                <div class=\"separator visible-xs\"></div>\r\n                <button class=\"save-changes-btn col-md-5 pull-right hidden-xs disable-action\">\r\n                    <span class=\"text\">"
    + escapeExpression(((helper = (helper = helpers.saveLabel || (depth0 != null ? depth0.saveLabel : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"saveLabel","hash":{},"data":data}) : helper)))
    + "</span>\r\n                </button>\r\n                <button class=\"cancel-btn col-md-12 visible-xs disable-action\">\r\n                    <span class=\"text\">"
    + escapeExpression(((helper = (helper = helpers.cancelLabel || (depth0 != null ? depth0.cancelLabel : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"cancelLabel","hash":{},"data":data}) : helper)))
    + "</span>\r\n                </button>\r\n            </div>\r\n        </div>\r\n";
},"2":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "                <div class=\"subscription-optin\" tabindex=\"0\" aria-label=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.subscriptionPreference : depth0)) != null ? stack1.description : stack1), depth0))
    + "\">\r\n                    <label class=\"preference-optin-container\" tabindex=\"-1\">";
  stack1 = lambda(((stack1 = (depth0 != null ? depth0.subscriptionPreference : depth0)) != null ? stack1.description : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n                        <input type=\"checkbox\" class=\"subscription-optin-checkbox\" tabindex=\"-1\">\r\n                        <span class=\"checkmark\"></span>\r\n                    </label>\r\n                </div>\r\n";
},"4":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "                <div class=\"communication-optin\" tabindex=\"0\" aria-label=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.communicationPreference : depth0)) != null ? stack1.description : stack1), depth0))
    + "\">\r\n                    <label class=\"preference-optin-container\" tabindex=\"-1\">";
  stack1 = lambda(((stack1 = (depth0 != null ? depth0.communicationPreference : depth0)) != null ? stack1.description : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n                        <input type=\"checkbox\" class=\"communication-optin-checkbox\" tabindex=\"-1\">\r\n                        <span class=\"checkmark\"></span>\r\n                    </label>\r\n                </div>\r\n";
},"6":function(depth0,helpers,partials,data) {
  var stack1, buffer = "            <div class=\"groupListing\">\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.groupList : depth0), {"name":"each","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                </div>\r\n";
},"7":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "                    <!-- <div class=\"groupHeader\">Group 1</div> -->                    \r\n                    <ul class=\"col-md-12 px-0 subscription-list\">\r\n                        <li class=\"groupHeader\">"
    + escapeExpression(((helper = (helper = helpers.groupname || (depth0 != null ? depth0.groupname : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"groupname","hash":{},"data":data}) : helper)))
    + "</li>\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.subscriptions : depth0), {"name":"each","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                    </ul>\r\n";
},"8":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "                                <li class=\"list-item ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.privateFlag : depth0), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\" \r\n                                        data-subscription-id=\""
    + escapeExpression(((helper = (helper = helpers.gigyamapping || (depth0 != null ? depth0.gigyamapping : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"gigyamapping","hash":{},"data":data}) : helper)))
    + "\"\r\n                                        data-external-id=\""
    + escapeExpression(((helper = (helper = helpers.externalid || (depth0 != null ? depth0.externalid : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"externalid","hash":{},"data":data}) : helper)))
    + "\"\r\n                                        data-frequency=\""
    + escapeExpression(((helper = (helper = helpers.frequency || (depth0 != null ? depth0.frequency : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"frequency","hash":{},"data":data}) : helper)))
    + "\"\r\n                                        data-title=\""
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "\">\r\n                                    <div class=\"communication-subscriptions-row\" tabindex=\"0\">\r\n                                        <div class=\"row mx-0 title-wrapper\" aria-label=\"enable or disable "
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "\">\r\n                                            <div class=\"title col-md-6\" aria-label=\"enable or disable "
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</div>\r\n                                            <div class=\"frequency-wrapper col-md-6\" aria-label=\"enable or disable "
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "\">\r\n                                                <label for=\"subscription switch\" class=\"subscription-switch mb-0\" aria-label=\"enable or disable "
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "\" tabindex=\"-1\">\r\n                                                    <input type=\"checkbox\" tabindex=\"-1\">\r\n                                                    <span class=\"slider\"></span>\r\n                                                </label>\r\n                                                <div class=\"frequency hidden-xs\">"
    + escapeExpression(((helper = (helper = helpers.frequencytext || (depth0 != null ? depth0.frequencytext : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"frequencytext","hash":{},"data":data}) : helper)))
    + "</div>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"row mx-0\">\r\n                                            <p class=\"description col-md-12 mb-0\">"
    + escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\r\n                                            <p class=\"frequency visible-xs\">"
    + escapeExpression(((helper = (helper = helpers.frequencytext || (depth0 != null ? depth0.frequencytext : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"frequencytext","hash":{},"data":data}) : helper)))
    + "</p>\r\n                                        </div>\r\n                                    </div>\r\n                                </li>\r\n";
},"9":function(depth0,helpers,partials,data) {
  return "private";
  },"11":function(depth0,helpers,partials,data) {
  var stack1, buffer = "                <ul class=\"col-md-12 px-0 subscription-list\">\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.subscription : depth0), {"name":"each","hash":{},"fn":this.program(12, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                </ul>\r\n";
},"12":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "                            <li class=\"list-item ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.privateFlag : depth0), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\"\r\n                                    data-subscription-id=\""
    + escapeExpression(((helper = (helper = helpers.gigyamapping || (depth0 != null ? depth0.gigyamapping : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"gigyamapping","hash":{},"data":data}) : helper)))
    + "\"\r\n                                    data-external-id=\""
    + escapeExpression(((helper = (helper = helpers.externalid || (depth0 != null ? depth0.externalid : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"externalid","hash":{},"data":data}) : helper)))
    + "\"\r\n                                    data-frequency=\""
    + escapeExpression(((helper = (helper = helpers.frequency || (depth0 != null ? depth0.frequency : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"frequency","hash":{},"data":data}) : helper)))
    + "\"\r\n                                    data-title=\""
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "\">\r\n\r\n                                <div class=\"communication-subscriptions-row\" tabindex=\"0\">\r\n                                    <div class=\"row mx-0 title-wrapper\" aria-label=\"enable or disable "
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "\">\r\n                                        <div class=\"title col-md-6\" aria-label=\"enable or disable "
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</div>\r\n                                        <div class=\"frequency-wrapper col-md-6\" aria-label=\"enable or disable "
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "\">\r\n                                            <label for=\"subscription switch\" class=\"subscription-switch mb-0\" aria-label=\"enable or disable "
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "\" tabindex=\"-1\">\r\n                                                <input type=\"checkbox\" tabindex=\"-1\">\r\n                                                <span class=\"slider\"></span>\r\n                                            </label>\r\n                                            <div class=\"frequency hidden-xs\">"
    + escapeExpression(((helper = (helper = helpers.frequencytext || (depth0 != null ? depth0.frequencytext : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"frequencytext","hash":{},"data":data}) : helper)))
    + "</div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"row mx-0\">\r\n                                        <p class=\"description col-md-12 mb-0\">"
    + escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\r\n                                        <p class=\"frequency visible-xs\">"
    + escapeExpression(((helper = (helper = helpers.frequencytext || (depth0 != null ? depth0.frequencytext : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"frequencytext","hash":{},"data":data}) : helper)))
    + "</p>\r\n                                    </div>\r\n                                </div>\r\n                            </li>\r\n";
},"14":function(depth0,helpers,partials,data) {
  return "include-email";
  },"16":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "                <label class=\"email-checkbox-container disable-action\" aria-label=\"enable or disable "
    + escapeExpression(((helper = (helper = helpers.emailDescription || (depth0 != null ? depth0.emailDescription : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"emailDescription","hash":{},"data":data}) : helper)))
    + "\">\r\n                    <p class=\"mb-0\">";
  stack1 = ((helper = (helper = helpers.emailDescription || (depth0 != null ? depth0.emailDescription : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"emailDescription","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</p>\r\n                    <input type=\"checkbox\" class=\"email-checkbox\">\r\n                    <span class=\"checkmark\"></span>\r\n                </label>\r\n";
},"18":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        <div class=\"subscriptions-empty\">\r\n            <h2 class=\"empty-title\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.nosubscription : depth0)) != null ? stack1.title : stack1), depth0))
    + "</h2>\r\n            <div class=\"description-wrapper\">\r\n                <p class=\"heading\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.nosubscription : depth0)) != null ? stack1.description : stack1), depth0))
    + "</p>\r\n                <p class=\"desc\">- "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.nosubscription : depth0)) != null ? stack1.description1 : stack1), depth0))
    + "</p>\r\n                <p class=\"desc\">- "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.nosubscription : depth0)) != null ? stack1.description2 : stack1), depth0))
    + "</p>\r\n                <p class=\"desc\">- "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.nosubscription : depth0)) != null ? stack1.description3 : stack1), depth0))
    + "</p>\r\n            </div>\r\n        </div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"communication-preferences\">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.isContentExist : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(18, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\r\n";
},"useData":true});



this["Handlebars"]["templates"]["tabs"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "<span class=\"warning-icon\"></span>";
  },"3":function(depth0,helpers,partials,data) {
  return " style=\"display:none;\"";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<div class=\"card\" data-site=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.tabs : stack1)) != null ? stack1.site : stack1), depth0))
    + "\" id=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.tabs : stack1)) != null ? stack1.site : stack1), depth0))
    + "\">\r\n    <div class=\"card-header\" id=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.tabs : stack1)) != null ? stack1.wrapperId : stack1), depth0))
    + "\">\r\n        <h5 class=\"mb-0\">\r\n            <button class=\"btn btn-link subscription-site-heading\" type=\"button\" data-toggle=\"collapse\"\r\n                    data-target=\"#"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.tabs : stack1)) != null ? stack1.headingId : stack1), depth0))
    + "\" aria-expanded=\"false\" aria-controls=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.tabs : stack1)) != null ? stack1.headingId : stack1), depth0))
    + "\">\r\n                    "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.tabs : stack1)) != null ? stack1.heading : stack1), depth0));
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.tabs : stack1)) != null ? stack1.warning : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n            </button>\r\n            <span class=\"icon-chevron-down pull-right accordion-icon\"></span>\r\n        </h5>\r\n    </div>\r\n    <div id=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.tabs : stack1)) != null ? stack1.headingId : stack1), depth0))
    + "\" class=\"collapse preferences-accordion\" aria-labelledby=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.tabs : stack1)) != null ? stack1.wrapperId : stack1), depth0))
    + "\" data-parent=\"#communication-preferences-tabs\">\r\n        <div class=\"card-body p-0\" id=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.tabs : stack1)) != null ? stack1.siteId : stack1), depth0))
    + "\">\r\n            <div class=\"web-spinner\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.isAuthor : stack1), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + ">\r\n                <img src=\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 1082 547'%2F%3E\"  width=\"1082\" height=\"547\" class=\"desktop-only img-responsive\" />\r\n                <img src=\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 640 580'%2F%3E\"  width=\"640\" height=\"580\" class=\"mobile-only img-responsive\" />\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
},"useData":true});



this["Handlebars"]["templates"]["speakers"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    "
    + escapeExpression(lambda((depth0 != null ? depth0.fullName : depth0), depth0))
    + "\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, buffer = "<div class=\"eventtabs-item col-md-12 speaker-data\">\r\n    <div class=\"col-md-3\">\r\n        <a href=\""
    + escapeExpression(lambda((depth0 != null ? depth0.pagePath : depth0), depth0))
    + "\" title=\""
    + escapeExpression(lambda((depth0 != null ? depth0.alt : depth0), depth0))
    + "\">\r\n            <img alt=\""
    + escapeExpression(lambda((depth0 != null ? depth0.alt : depth0), depth0))
    + "\" src=\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 237 158'%2F%3E\" data-mobile=\""
    + escapeExpression(lambda((depths[1] != null ? depths[1].assetDomainName : depths[1]), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.contactProfile : depth0), depth0))
    + "/jcr:content/renditions/cq5dam.web.512.341.jpg\" data-desktop=\""
    + escapeExpression(lambda((depths[1] != null ? depths[1].assetDomainName : depths[1]), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.contactProfile : depth0), depth0))
    + "/jcr:content/renditions/cq5dam.web.237.158.jpg\" class=\"img-responsive lazy\" />\r\n        </a>\r\n    </div>\r\n    <div class=\"col-md-9\">\r\n        <h2 class=\"secondary-head\">\r\n            <a href=\""
    + escapeExpression(lambda((depth0 != null ? depth0.pagePath : depth0), depth0))
    + "\">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.fullName : depth0), {"name":"if","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </a>\r\n        </h2>\r\n        <h3 class=\"tertiary-head\">\r\n            <span>"
    + escapeExpression(lambda((depth0 != null ? depth0.jobTitle : depth0), depth0))
    + "</span>\r\n            <span>"
    + escapeExpression(lambda((depth0 != null ? depth0.location : depth0), depth0))
    + "</span>\r\n        </h3>\r\n        <p>"
    + escapeExpression(lambda((depth0 != null ? depth0.description : depth0), depth0))
    + "</p>\r\n        <div class=\"row\">\r\n        <div class=\" contactFmLink\">\r\n            <div class=\"primary-cta-space\">&nbsp;</div>\r\n            <div class=\"pull-right\">\r\n                <span class=\"btn-cta contact-btn\">\r\n                   <span class=\"icon-chevron-right \"></span>\r\n                      <span data-modal-url=\"/etc/partials/kpmgpublic/peoplecontactform/peoplecontactform.html\" data-backdrop=\"static\" data-keyboard=\"false\" data-remote=\""
    + escapeExpression(lambda((depth0 != null ? depth0.peopleContactFormLink : depth0), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.pagePath : depth0), depth0))
    + "\" class=\"contact people-connect btn-modal pcfLink component-data-link modal-open\" tabindex=\"0\">"
    + escapeExpression(lambda((depth0 != null ? depth0.contactFormLinkCopy : depth0), depth0))
    + "</span>\r\n                </span>\r\n            </div>\r\n        </div>\r\n        <div class=\"quickView desktop-only\">\r\n            <div class=\"secondary-cta-space\">&nbsp;</div>\r\n            <div class=\"pull-right\">\r\n                <span tabindex=\"0\" class=\"btn-cta quickview-btn\">\r\n                     <span class=\"icon-chevron-right \"></span>\r\n                     <a href=\""
    + escapeExpression(lambda((depth0 != null ? depth0.pagePath : depth0), depth0))
    + "\" data-viewindex=\""
    + escapeExpression(((helper = (helper = helpers.indexVal || (depth0 != null ? depth0.indexVal : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"indexVal","hash":{},"data":data}) : helper)))
    + "\" role=\"button\" class=\"component-link\" data-toggle=\"modal\">"
    + escapeExpression(lambda((depth0 != null ? depth0.quickViewInTile : depth0), depth0))
    + "</a>\r\n                </span>\r\n            </div>\r\n        </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n";
},"useData":true,"useDepths":true});



this["Handlebars"]["templates"]["eventtabs-quickView"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "         <p class=\"peopleDetails\">"
    + escapeExpression(lambda((depth0 != null ? depth0.jobTitle : depth0), depth0))
    + "</p>\r\n";
},"3":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "         <p class=\"peopleDetails\">"
    + escapeExpression(lambda((depth0 != null ? depth0.memberFirm : depth0), depth0))
    + "</p>\r\n";
},"5":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "         <p class=\"description\">"
    + escapeExpression(lambda((depth0 != null ? depth0.description : depth0), depth0))
    + "</p>\r\n";
},"7":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "         <div class=\"pull-right\">\r\n            <span class=\"icon-chevron-right \"></span>\r\n            <span data-modal-url=\"/etc/partials/kpmgpublic/peoplecontactform/peoplecontactform.html\" data-backdrop=\"static\" data-keyboard=\"false\" data-remote=\""
    + escapeExpression(lambda((depth0 != null ? depth0.peopleContactFormLink : depth0), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.pagePath : depth0), depth0))
    + "\"  class=\"contact people-connect btn-modal component-data-link modal-inside-modal\" id=\"peoplecontactlink\" tabindex=\"0\">"
    + escapeExpression(lambda((depth0 != null ? depth0.contactFormLinkCopy : depth0), depth0))
    + "</span>\r\n         </div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<div class=\"modalBodyLeft\">\r\n   <div class=\"imgContainer\">\r\n      <a href=\""
    + escapeExpression(lambda((depth0 != null ? depth0.pagePath : depth0), depth0))
    + "\" title=\""
    + escapeExpression(lambda((depth0 != null ? depth0.alt : depth0), depth0))
    + "\" tabindex=\"-1\"><img src=\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 237 158'%2F%3E\" data-src=\"\" data-desktop=\""
    + escapeExpression(lambda((depths[1] != null ? depths[1].assetDomainName : depths[1]), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.contactProfile : depth0), depth0))
    + "/jcr:content/renditions/cq5dam.web.237.158.jpg\" data-mobile=\""
    + escapeExpression(lambda((depths[1] != null ? depths[1].assetDomainName : depths[1]), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.contactProfile : depth0), depth0))
    + "/jcr:content/renditions/cq5dam.web.512.341.jpg\" alt=\""
    + escapeExpression(lambda((depth0 != null ? depth0.alt : depth0), depth0))
    + "\" class=\"img-responsive lazy\"/></a>\r\n   </div>\r\n</div>\r\n<div class=\"modalBodyRight\">\r\n   <div class=\"peopleContactDetails\">\r\n      <p class=\"peopleDetails\"><a href=\""
    + escapeExpression(lambda((depth0 != null ? depth0.pagePath : depth0), depth0))
    + "\" title=\""
    + escapeExpression(lambda((depth0 != null ? depth0.alt : depth0), depth0))
    + "\">"
    + escapeExpression(lambda((depth0 != null ? depth0.salutation : depth0), depth0))
    + " "
    + escapeExpression(lambda((depth0 != null ? depth0.firstName : depth0), depth0))
    + " "
    + escapeExpression(lambda((depth0 != null ? depth0.middleInitial : depth0), depth0))
    + " "
    + escapeExpression(lambda((depth0 != null ? depth0.lastName : depth0), depth0))
    + " "
    + escapeExpression(lambda((depth0 != null ? depth0.suffix : depth0), depth0))
    + "</a></p>\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.jobTitle : depth0), {"name":"if","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.memberFirm : depth0), {"name":"if","hash":{},"fn":this.program(3, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.description : depth0), {"name":"if","hash":{},"fn":this.program(5, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.peopleContactFormLink : depth0), {"name":"if","hash":{},"fn":this.program(7, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "   </div>\r\n\r\n</div>";
},"useData":true,"useDepths":true});



this["Handlebars"]["templates"]["searchresults-facets"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "  <li class=\"facetFilters date "
    + escapeExpression(lambda((depth0 != null ? depth0['category-hide'] : depth0), depth0))
    + "\">\r\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "  <li class=\"facetFilters "
    + escapeExpression(lambda((depth0 != null ? depth0['facet-title'] : depth0), depth0))
    + " "
    + escapeExpression(lambda((depth0 != null ? depth0['category-hide'] : depth0), depth0))
    + " ";
  stack1 = ((helpers.moreFacetsCheck || (depth0 && depth0.moreFacetsCheck) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1['facet-item'] : stack1), {"name":"moreFacetsCheck","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\">\r\n";
},"4":function(depth0,helpers,partials,data) {
  return "more-facets-group";
  },"6":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "         "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1.KPMG_Filter_Year : stack1), depth0))
    + "\r\n";
},"8":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "         "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1.KPMG_Cont_Type_Path : stack1), depth0))
    + "\r\n";
},"10":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1.KPMG_Geo_Rel_Path : stack1), depth0))
    + "\r\n";
},"12":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1.KPMG_Market_Path : stack1), depth0))
    + "\r\n";
},"14":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1.KPMG_Service_Pth_Loc : stack1), depth0))
    + "\r\n";
},"16":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1.KPMG_Service_Path : stack1), depth0))
    + "\r\n";
},"18":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1.KPMG_Topic_Path : stack1), depth0))
    + "\r\n";
},"20":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1.KPMG_Ind_Path_Loc : stack1), depth0))
    + "\r\n";
},"22":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1.KPMG_Ind_Path : stack1), depth0))
    + "\r\n";
},"24":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1.KPMG_EVENT_MEM_FIRM : stack1), depth0))
    + "\r\n";
},"26":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1.KPMG_Event_Mem_Firm : stack1), depth0))
    + "\r\n";
},"28":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1.KPMG_Cont_Mem_Firm : stack1), depth0))
    + "\r\n";
},"30":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1.KPMG_Blog_Topics : stack1), depth0))
    + "\r\n";
},"32":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1.KPMG_FILTER_YEAR : stack1), depth0))
    + "\r\n";
},"34":function(depth0,helpers,partials,data,depths) {
  var stack1, buffer = "\r\n\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['facet-children'] : depth0), {"name":"if","hash":{},"fn":this.program(35, data, depths),"inverse":this.program(40, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['facet-selected'] : depth0), {"name":"if","hash":{},"fn":this.program(42, data, depths),"inverse":this.program(44, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['facet-selected'] : depth0), {"name":"if","hash":{},"fn":this.program(46, data, depths),"inverse":this.program(54, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['facet-children'] : depth0), {"name":"if","hash":{},"fn":this.program(60, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "         </li>\r\n";
},"35":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, lambda=this.lambda, buffer = "         <li class=\"";
  stack1 = ((helpers.moreItemsCheck || (depth0 && depth0.moreItemsCheck) || helperMissing).call(depth0, (data && data.index), {"name":"moreItemsCheck","hash":{},"fn":this.program(36, data),"inverse":this.program(38, data),"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += " has-nested ";
  stack1 = lambda((depth0 != null ? depth0['facet-hide'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\">\r\n";
},"36":function(depth0,helpers,partials,data) {
  return " LT5Facets ";
  },"38":function(depth0,helpers,partials,data) {
  return " GT5Facets ";
  },"40":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, lambda=this.lambda, buffer = "         <li class=\"";
  stack1 = ((helpers.moreItemsCheck || (depth0 && depth0.moreItemsCheck) || helperMissing).call(depth0, (data && data.index), {"name":"moreItemsCheck","hash":{},"fn":this.program(36, data),"inverse":this.program(38, data),"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "  ";
  stack1 = lambda((depth0 != null ? depth0['facet-hide'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\">\r\n";
},"42":function(depth0,helpers,partials,data) {
  return "            <span class=\"icon-checkmark mblCheckmark\"></span>\r\n";
  },"44":function(depth0,helpers,partials,data) {
  return "            <span class=\"icon-checkmark mblCheckmark visibilty-hidden\"></span>\r\n";
  },"46":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "                  <label class=\"facetsCheckbox checked\">\r\n                  <input type=\"checkbox\" class=\"facetBox\"  "
    + escapeExpression(lambda((depth0 != null ? depth0.disabled : depth0), depth0))
    + " value=\"";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-link=\""
    + escapeExpression(lambda((depth0 != null ? depth0.undolink : depth0), depth0))
    + "\" data-title=\"";
  stack1 = lambda((depths[2] != null ? depths[2]['facet-title'] : depths[2]), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-key=\"";
  stack1 = lambda((depths[2] != null ? depths[2]['facet-key'] : depths[2]), depth0);
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depths[2] != null ? depths[2]['facet-has-children'] : depths[2]), {"name":"if","hash":{},"fn":this.program(47, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\"  data-name=\"";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" checked>\r\n\r\n";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-name'] : depth0), "eqi", "All", {"name":"compare","hash":{},"fn":this.program(49, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-name'] : depth0), "neq", "All", {"name":"compare","hash":{},"fn":this.program(51, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                  </label>\r\n";
},"47":function(depth0,helpers,partials,data,depths) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda((depths[3] != null ? depths[3]['parent-suffix'] : depths[3]), depth0));
  },"49":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, buffer = "                    <span class=\"facetName\">";
  stack1 = lambda(((stack1 = (depths[3] != null ? depths[3]['facet-values'] : depths[3])) != null ? stack1.ALL_TEXT : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span>\r\n";
},"51":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, buffer = "                    <span class=\"facetName\">";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "</span>\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['facet-children'] : depth0), {"name":"if","hash":{},"fn":this.program(52, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n";
},"52":function(depth0,helpers,partials,data) {
  return "                      <span class=\"icon-chevron-down pull-right nestedFacetsToogleBtn\" tabindex=\"0\" aria-expanded=\"false\"></span>\r\n";
  },"54":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "                  <label class=\"facetsCheckbox\">\r\n                  <input type=\"checkbox\" class=\"facetBox\" "
    + escapeExpression(lambda((depth0 != null ? depth0.disabled : depth0), depth0))
    + " value=\"";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\"  data-link=\""
    + escapeExpression(lambda((depth0 != null ? depth0.link : depth0), depth0))
    + "\" data-title=\"";
  stack1 = lambda((depths[2] != null ? depths[2]['facet-title'] : depths[2]), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-key=\"";
  stack1 = lambda((depths[2] != null ? depths[2]['facet-key'] : depths[2]), depth0);
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depths[2] != null ? depths[2]['facet-has-children'] : depths[2]), {"name":"if","hash":{},"fn":this.program(47, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-name=\"";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\r\n";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-name'] : depth0), "eqi", "All", {"name":"compare","hash":{},"fn":this.program(55, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-name'] : depth0), "neq", "All", {"name":"compare","hash":{},"fn":this.program(57, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                  </label>\r\n";
},"55":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, buffer = "                     <span class=\"facetName\">";
  stack1 = lambda(((stack1 = (depths[3] != null ? depths[3]['facet-values'] : depths[3])) != null ? stack1.ALL_TEXT : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span>\r\n";
},"57":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, buffer = "                    <span class=\"facetName\">";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "</span>\r\n\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['facet-children'] : depth0), {"name":"if","hash":{},"fn":this.program(58, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n";
},"58":function(depth0,helpers,partials,data) {
  return "                    <span class=\"icon-chevron-down pull-right nestedFacetsToogleBtn\" tabindex=\"0\" aria-expanded=\"false\"></span>\r\n";
  },"60":function(depth0,helpers,partials,data,depths) {
  var stack1, buffer = "\r\n            <ul class=\"nestedFacets\">\r\n";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 != null ? depth0['facet-children'] : depth0)) != null ? stack1['facet-child'] : stack1), {"name":"each","hash":{},"fn":this.program(61, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </ul>\r\n";
},"61":function(depth0,helpers,partials,data,depths) {
  var stack1, buffer = "               <li class=\"LT5Facets\">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['facet-selected'] : depth0), {"name":"if","hash":{},"fn":this.program(62, data, depths),"inverse":this.program(71, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "               </li>\r\n";
},"62":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['facet-selected'] : depth0), {"name":"if","hash":{},"fn":this.program(63, data, depths),"inverse":this.program(65, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                  <label class=\"facetsCheckbox checked\">\r\n                  <input type=\"checkbox\" class=\"facetBox\"  value=\"";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-link=\""
    + escapeExpression(lambda((depth0 != null ? depth0.undolink : depth0), depth0))
    + "\" data-parent=\"";
  stack1 = lambda((depths[2] != null ? depths[2]['facet-name'] : depths[2]), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-title=\"";
  stack1 = lambda((depths[4] != null ? depths[4]['facet-title'] : depths[4]), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-key=\"";
  stack1 = lambda((depths[4] != null ? depths[4]['facet-key'] : depths[4]), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += escapeExpression(lambda((depths[4] != null ? depths[4]['child-suffix'] : depths[4]), depth0))
    + "\" data-name=\"";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" checked>\r\n";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-name'] : depth0), "eqi", ((stack1 = (depths[2] != null ? depths[2]['facet-values'] : depths[2])) != null ? stack1.ALL_TEXT : stack1), {"name":"compare","hash":{},"fn":this.program(67, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-name'] : depth0), "neq", ((stack1 = (depths[2] != null ? depths[2]['facet-values'] : depths[2])) != null ? stack1.ALL_TEXT : stack1), {"name":"compare","hash":{},"fn":this.program(69, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"63":function(depth0,helpers,partials,data) {
  return "                    <span class=\"icon-checkmark mblCheckmark\"></span>\r\n";
  },"65":function(depth0,helpers,partials,data) {
  return "                     <span class=\"icon-checkmark mblCheckmark visibilty-hidden\"></span>\r\n";
  },"67":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, buffer = "                     <span class=\"facetName\">";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span></label>\r\n";
},"69":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, buffer = "                    <span class=\"facetName\">";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span></label>\r\n";
},"71":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "                  <span class=\"icon-checkmark mblCheckmark visibilty-hidden\"></span>\r\n                  <label class=\"facetsCheckbox\">\r\n                  <input type=\"checkbox\" class=\"facetBox\" value=\"";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\"  data-link=\""
    + escapeExpression(lambda((depth0 != null ? depth0.link : depth0), depth0))
    + "\" data-parent=\"";
  stack1 = lambda((depths[2] != null ? depths[2]['facet-name'] : depths[2]), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-title=\"";
  stack1 = lambda((depths[4] != null ? depths[4]['facet-title'] : depths[4]), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-key=\"";
  stack1 = lambda((depths[4] != null ? depths[4]['facet-key'] : depths[4]), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += escapeExpression(lambda((depths[4] != null ? depths[4]['child-suffix'] : depths[4]), depth0))
    + "\" data-name=\"";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\r\n                  <span class=\"facetName\">";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span></label>\r\n";
},"73":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "   <div class=\"moreFacets\">\r\n      <span class=\"icon-chevron-down hidden\"></span>\r\n      <a class=\"component-link moreFacetsLink\" data-more=\"more-topics\" title=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1.more : stack1), depth0))
    + "\" href=\"javascript:void(0);\" aria-expanded=\"false\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1.more : stack1), depth0))
    + "</a>\r\n   </div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-title'] : depth0), "eq", "KPMG_Filter_Year", {"name":"compare","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-title'] : depth0), "neq", "KPMG_Filter_Year", {"name":"compare","hash":{},"fn":this.program(3, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n   <h4 class=\"component-head\"><span class=\"facetTitle\">\r\n";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-title'] : depth0), "eq", "KPMG_Filter_Year", {"name":"compare","hash":{},"fn":this.program(6, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-title'] : depth0), "eq", "KPMG_Cont_Type_Path", {"name":"compare","hash":{},"fn":this.program(8, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-title'] : depth0), "eq", "KPMG_Geo_Rel_Path", {"name":"compare","hash":{},"fn":this.program(10, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-title'] : depth0), "eq", "KPMG_Market_Path", {"name":"compare","hash":{},"fn":this.program(12, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-title'] : depth0), "eq", "KPMG_Service_Pth_Loc", {"name":"compare","hash":{},"fn":this.program(14, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-title'] : depth0), "eq", "KPMG_Service_Path", {"name":"compare","hash":{},"fn":this.program(16, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-title'] : depth0), "eq", "KPMG_Topic_Path", {"name":"compare","hash":{},"fn":this.program(18, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-title'] : depth0), "eq", "KPMG_Ind_Path_Loc", {"name":"compare","hash":{},"fn":this.program(20, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-title'] : depth0), "eq", "KPMG_Ind_Path", {"name":"compare","hash":{},"fn":this.program(22, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-title'] : depth0), "eq", "KPMG_EVENT_MEM_FIRM", {"name":"compare","hash":{},"fn":this.program(24, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-title'] : depth0), "eq", "KPMG_Event_Mem_Firm", {"name":"compare","hash":{},"fn":this.program(26, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-title'] : depth0), "eq", "KPMG_Cont_Mem_Firm", {"name":"compare","hash":{},"fn":this.program(28, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-title'] : depth0), "eq", "KPMG_Blog_Topics", {"name":"compare","hash":{},"fn":this.program(30, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-title'] : depth0), "eq", "KPMG_FILTER_YEAR", {"name":"compare","hash":{},"fn":this.program(32, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "   </span> <span class=\"icon-chevron-up\"></span></h4>\r\n   <div class=\"facetsContainer\">\r\n      <ul class=\"facetsOptions\">\r\n";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1['facet-item'] : stack1), {"name":"each","hash":{},"fn":this.program(34, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "      </ul>\r\n      <div class=\"dottedLine\"></div>\r\n   </div>\r\n";
  stack1 = ((helpers.moreFacetsCheck || (depth0 && depth0.moreFacetsCheck) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1['facet-item'] : stack1), {"name":"moreFacetsCheck","hash":{},"fn":this.program(73, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</li>\r\n";
},"useData":true,"useDepths":true});



this["Handlebars"]["templates"]["tabList"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return " active ";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<li class=\"tabbedComponentTab ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['facet-selected'] : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\">\r\n   <a class=\"hasResults\" data-link=\""
    + escapeExpression(lambda((depth0 != null ? depth0.link : depth0), depth0))
    + "\" href=\"#\">\r\n    <span class=\"sr-only\">Filter by</span><span class=\"pull-left\">"
    + escapeExpression(lambda((depth0 != null ? depth0.tab : depth0), depth0))
    + "</span>\r\n   </a>\r\n</li>\r\n";
},"useData":true});



this["Handlebars"]["templates"]["searchresults-searchHeader"] = Handlebars.template({"1":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "                <option value=\""
    + escapeExpression(lambda((depth0 != null ? depth0['display-name'] : depth0), depth0))
    + "\" "
    + escapeExpression(((helpers.selectboxValidation || (depth0 && depth0.selectboxValidation) || helperMissing).call(depth0, (depth0 != null ? depth0.selected : depth0), {"name":"selectboxValidation","hash":{},"data":data})))
    + " title=\""
    + escapeExpression(lambda((depth0 != null ? depth0['display-name'] : depth0), depth0))
    + "\" data-link=\""
    + escapeExpression(lambda((depth0 != null ? depth0.link : depth0), depth0))
    + "\">\r\n";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['display-name'] : depth0), "eqi", "Most Viewed", {"name":"compare","hash":{},"fn":this.program(2, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['display-name'] : depth0), "eqi", "Most Popular", {"name":"compare","hash":{},"fn":this.program(4, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['display-name'] : depth0), "eqi", "By Date", {"name":"compare","hash":{},"fn":this.program(6, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['display-name'] : depth0), "eqi", "Most Relevant", {"name":"compare","hash":{},"fn":this.program(8, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                </option>\r\n";
},"2":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                              "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depths[2] != null ? depths[2].CQModel : depths[2])) != null ? stack1.i18nModel : stack1)) != null ? stack1.sortingViewed : stack1), depth0))
    + "\r\n";
},"4":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                          "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depths[2] != null ? depths[2].CQModel : depths[2])) != null ? stack1.i18nModel : stack1)) != null ? stack1.sortingPopular : stack1), depth0))
    + "\r\n";
},"6":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                          "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depths[2] != null ? depths[2].CQModel : depths[2])) != null ? stack1.i18nModel : stack1)) != null ? stack1.sortingDate : stack1), depth0))
    + "\r\n";
},"8":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                          "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depths[2] != null ? depths[2].CQModel : depths[2])) != null ? stack1.i18nModel : stack1)) != null ? stack1.sortingRelevance : stack1), depth0))
    + "\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<div class=\"sortByContainer\">\r\n    <div class=\"sortBy\">\r\n        <span class=\"sortByText\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.CQModel : depth0)) != null ? stack1.i18nModel : stack1)) != null ? stack1.sortByCopy : stack1), depth0))
    + "</span>\r\n        <div class=\"custom-select custom-class-name\">\r\n            <select class=\"sortOptions\" aria-label=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.CQModel : depth0)) != null ? stack1.i18nModel : stack1)) != null ? stack1.sortByCopy : stack1), depth0))
    + "\">\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.SelectBoxOptions : depth0), {"name":"each","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </select>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
},"useData":true,"useDepths":true});



this["Handlebars"]["templates"]["resultsCount"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "    <h3>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.totalResults : depth0)) != null ? stack1.searchQuery : stack1), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.program(5, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.totalResults : depth0)) != null ? stack1.total : stack1), "eq", "0", {"name":"compare","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </h3>\r\n    <div class=\"noDataFound\">\r\n        <div class=\"zero-results-suggestions hidden\">\r\n            <p class=\"suggestions-heading\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.CQModel : depth0)) != null ? stack1.i18nModel : stack1)) != null ? stack1.noResultsCopyLineTwoPartOne : stack1), depth0))
    + " <span class=\"search-query-text hidden\">\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.totalResults : depth0)) != null ? stack1.searchQuery : stack1), depth0))
    + "\"</span> "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.CQModel : depth0)) != null ? stack1.i18nModel : stack1)) != null ? stack1.noResultsCopyLineTwoPartTwo : stack1), depth0))
    + "</p>\r\n\r\n            <div class=\"suggestions-wrap\">\r\n                <p class=\"suggestions-text\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.CQModel : depth0)) != null ? stack1.i18nModel : stack1)) != null ? stack1.noResultsCopyLineThree : stack1), depth0))
    + "</p>\r\n                <p>- "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.CQModel : depth0)) != null ? stack1.i18nModel : stack1)) != null ? stack1.noResultsCopyLineFour : stack1), depth0))
    + "</p>\r\n                <p>- "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.CQModel : depth0)) != null ? stack1.i18nModel : stack1)) != null ? stack1.noResultsCopyLineFive : stack1), depth0))
    + "</p>\r\n                <p>- "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.CQModel : depth0)) != null ? stack1.i18nModel : stack1)) != null ? stack1.noResultsCopyLineSix : stack1), depth0))
    + "</p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n";
},"2":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.totalResults : depth0)) != null ? stack1.total : stack1), "neq", "0", {"name":"compare","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"3":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "                <span id=\"totalResults\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.totalResults : depth0)) != null ? stack1.total : stack1), depth0))
    + "</span>\r\n                "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.CQModel : depth0)) != null ? stack1.i18nModel : stack1)) != null ? stack1.resultsForCopy : stack1), depth0))
    + " <span class=\"search-query-text hidden\">";
  stack1 = lambda(((stack1 = (depth0 != null ? depth0.totalResults : depth0)) != null ? stack1.searchQuery : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span>\r\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <span id='totalResults'>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.totalResults : depth0)) != null ? stack1.total : stack1), depth0))
    + "</span> "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.CQModel : depth0)) != null ? stack1.i18nModel : stack1)) != null ? stack1.resultsForCopyOne : stack1), depth0))
    + "\r\n";
},"7":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.CQModel : depth0)) != null ? stack1.i18nModel : stack1)) != null ? stack1.resultsLineOne : stack1), depth0))
    + " <span class=\"search-query-text hidden\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.totalResults : depth0)) != null ? stack1.searchQuery : stack1), depth0))
    + "</span>\r\n";
},"9":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "    <div class=\"noDataFound didYouMean\">\r\n        <h3>\r\n            "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.CQModel : depth0)) != null ? stack1.i18nModel : stack1)) != null ? stack1.resultsLineOne : stack1), depth0))
    + " <span class=\"search-query-text hidden\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.totalResults : depth0)) != null ? stack1.searchQuery : stack1), depth0))
    + "</span>\r\n        </h3>\r\n        <div class=\"zero-results-suggestions hidden\">\r\n            <p class=\"suggestions-heading\">\r\n                "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.CQModel : depth0)) != null ? stack1.i18nModel : stack1)) != null ? stack1.didYouMean : stack1), depth0))
    + "\r\n";
  stack1 = helpers.each.call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.suggestions : depth0)) != null ? stack1['suggested-items'] : stack1)) != null ? stack1['suggested-item'] : stack1), {"name":"each","hash":{},"fn":this.program(10, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </p>\r\n        </div>\r\n    </div>\r\n";
},"10":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "                <a data-link=\"";
  stack1 = lambda((depth0 != null ? depth0.link : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\" title=\""
    + escapeExpression(lambda((depth0 != null ? depth0.word : depth0), depth0))
    + "\" class=\"didyoumeanlink\">"
    + escapeExpression(lambda((depth0 != null ? depth0.word : depth0), depth0))
    + "</a>&nbsp;&nbsp;\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "<div class=\"resultFound\">\r\n";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.suggestions : depth0)) != null ? stack1['suggestion-exists'] : stack1), "neq", "true", {"name":"compare","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.suggestions : depth0)) != null ? stack1['suggestion-exists'] : stack1), "eq", "true", {"name":"compare","hash":{},"fn":this.program(9, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\r\n";
},"useData":true});



this["Handlebars"]["templates"]["searchresults-resultSet"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "        <div class=\"badge\">\r\n            <span class=\"icon-star-badge\"></span>\r\n        </div>\r\n";
  },"3":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "            <h3 class=\"alt-secondary-head tertiary-trapezoid-bg image-title\">\r\n                <span>\r\n                    "
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Contact_FN : depth0), depth0))
    + " "
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Contact_LN : depth0), depth0))
    + "\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.KPMG_Contact_City : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.program(6, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                </span>\r\n            </h3>\r\n";
},"4":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    &#124; "
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Contact_City : depth0), depth0))
    + ", "
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Contact_Country : depth0), depth0))
    + "\r\n";
},"6":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    &#124; "
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Contact_Country : depth0), depth0))
    + "\r\n";
},"8":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <p class=\"peopleDetails line-clamp line-clamp-2\">"
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Contact_Job_Ttl : depth0), depth0))
    + "</p>\r\n";
},"10":function(depth0,helpers,partials,data) {
  return "            <span class=\"icon-date icon\"></span>\r\n";
  },"12":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0.KPMG_Tab_Type : depth0), "neq", "Events", {"name":"compare","hash":{},"fn":this.program(13, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"13":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0.KPMG_Tab_Type : depth0), "neq", "people", {"name":"compare","hash":{},"fn":this.program(14, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"14":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0.KPMG_Tab_Type : depth0), "neq", "People", {"name":"compare","hash":{},"fn":this.program(15, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"15":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.KPMG_Article_Primary_Format : depth0), {"name":"if","hash":{},"fn":this.program(16, data),"inverse":this.program(18, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"16":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <span class=\"icon-"
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Article_Primary_Format : depth0), depth0))
    + " icon\"></span>\r\n";
},"18":function(depth0,helpers,partials,data) {
  return "            <span class=\"icon-page icon\"></span>\r\n";
  },"20":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <p class=\"contact-tabs-date contact-tabs-date-insights\">"
    + escapeExpression(((helpers.formatDate || (depth0 && depth0.formatDate) || helperMissing).call(depth0, (depth0 != null ? depth0.KPMG_Article_Date_Time : depth0), {"name":"formatDate","hash":{},"data":data})))
    + "</p>\r\n";
},"22":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <p class=\"contact-tabs-date\">"
    + escapeExpression(((helpers.formatDate || (depth0 && depth0.formatDate) || helperMissing).call(depth0, (depth0 != null ? depth0.KPMG_Event_Start_time : depth0), {"name":"formatDate","hash":{},"data":data})))
    + "</p>\r\n";
},"24":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <p class=\"contact-tabs-date event-type\">"
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Event_Type : depth0), depth0))
    + "</p>\r\n";
},"26":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    <div class=\"cta-space\">&nbsp;</div>\r\n                    <div class=\" pull-right\">\r\n                        <span class=\"btn-cta contact-btn\" tabindex=\"0\">\r\n                            <span class=\"icon-email\"></span>\r\n                            <span data-modal-url=\"/etc/partials/kpmgpublic/peoplecontactform/peoplecontactform.html\" data-remote=\""
    + escapeExpression(lambda((depth0 != null ? depth0.peopleContactFormLink : depth0), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_URL : depth0), depth0))
    + "\" class=\"contact btn-modal pcfLink modal-open\">"
    + escapeExpression(lambda((depth0 != null ? depth0.contactFormLinkCopy : depth0), depth0))
    + "\r\n                            </span>\r\n                        </span>\r\n                    </div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, buffer = "<a title=\""
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Title : depth0), depth0))
    + "\" href=\""
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_URL : depth0), depth0))
    + "\">\r\n    <div class=\"result "
    + escapeExpression(lambda((depth0 != null ? depth0.resultsView : depth0), depth0))
    + " col-md-height col-sm-height col-full-height\" tabindex=\"0\">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.favourite : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        <div class=\"imgContainer\">\r\n            <img src=\""
    + escapeExpression(((helper = (helper = helpers.assetDomainName || (depth0 != null ? depth0.assetDomainName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"assetDomainName","hash":{},"data":data}) : helper)))
    + "/content/dam/kpmg/images/platform/blank.gif\" data-src=\"\" data-desktop=\""
    + escapeExpression(((helper = (helper = helpers.assetDomainName || (depth0 != null ? depth0.assetDomainName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"assetDomainName","hash":{},"data":data}) : helper)))
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Image : depth0), depth0))
    + "/jcr:content/renditions/cq5dam.web.237.158.jpg\" data-mobile=\""
    + escapeExpression(((helper = (helper = helpers.assetDomainName || (depth0 != null ? depth0.assetDomainName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"assetDomainName","hash":{},"data":data}) : helper)))
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Image : depth0), depth0))
    + "/jcr:content/renditions/cq5dam.web.512.341.jpg\" alt=\""
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Title : depth0), depth0))
    + "\" class=\"img-responsive lazy\" />\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.KPMG_Contact_FN : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        </div>\r\n        <div class=\"textContainer\">\r\n            <h3 class=\"secondary-head line-clamp line-clamp-3\"><p> "
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Title : depth0), depth0))
    + " </p></h3>\r\n";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0.KPMG_Tab_Type : depth0), "eqi", "people", {"name":"compare","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0.KPMG_Tab_Type : depth0), "eqi", "events", {"name":"compare","hash":{},"fn":this.program(10, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0.KPMG_Tab_Type : depth0), "neq", "events", {"name":"compare","hash":{},"fn":this.program(12, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.KPMG_Article_Date : depth0), {"name":"if","hash":{},"fn":this.program(20, data),"inverse":this.program(22, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.KPMG_Event_Type : depth0), {"name":"if","hash":{},"fn":this.program(24, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n            <p class=\"description line-clamp line-clamp-5\">"
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Short_Desc : depth0), depth0))
    + "</p>\r\n\r\n            <div class=\"row\">\r\n                <div class=\"contactFmLink\">\r\n";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0.KPMG_Tab_Type : depth0), "eqi", "people", {"name":"compare","hash":{},"fn":this.program(26, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</a>\r\n";
},"useData":true});



this["Handlebars"]["templates"]["registration-promo"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, buffer = "                    ";
  stack1 = lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.registrationPromo : stack1)) != null ? stack1.registrationTitleLabel : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "                    ";
  stack1 = ((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.registrationPromo : stack1)) != null ? stack1.registrationTitleLabel : stack1), {"name":"i18n","hash":{},"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, buffer = "                    ";
  stack1 = lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.registrationPromo : stack1)) != null ? stack1.registrationDescriptionLabel : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n";
},"7":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "                    ";
  stack1 = ((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.registrationPromo : stack1)) != null ? stack1.registrationDescriptionLabel : stack1), {"name":"i18n","hash":{},"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<!-- Begin Component: RegistrationPromo -->\r\n<a class=\"module-registration-promo component hidden\" href=\"#\">\r\n    <div class=\"promo-wrapper col-md-12\" tabindex=\"0\">\r\n        <div class=\"promo-content\">\r\n            <h3 class=\"heading\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.registrationPromo : stack1)) != null ? stack1.search : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "            </h3>\r\n            <p class=\"description\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.registrationPromo : stack1)) != null ? stack1.search : stack1), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.program(7, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </P>\r\n        </div>\r\n        <div class=\"promo-image\">\r\n            <img src=\"/etc/designs/kpmgpublic/images/site-selector-card-promo.png\" alt=\"\"/>\r\n        </div>\r\n    </div>\r\n</a>\r\n<!-- End Component: RegistrationPromo -->\r\n";
},"useData":true});



this["Handlebars"]["templates"]["resultlistingb-facets"] = Handlebars.template({"1":function(depth0,helpers,partials,data,depths) {
  var stack1, buffer = "\r\n\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['facet-children'] : depth0), {"name":"if","hash":{},"fn":this.program(2, data, depths),"inverse":this.program(5, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['facet-selected'] : depth0), {"name":"if","hash":{},"fn":this.program(7, data, depths),"inverse":this.program(9, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['facet-selected'] : depth0), {"name":"if","hash":{},"fn":this.program(11, data, depths),"inverse":this.program(19, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['facet-children'] : depth0), {"name":"if","hash":{},"fn":this.program(25, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "         </li>\r\n";
},"2":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, buffer = "         <li class=\"LT5Facets has-nested ";
  stack1 = lambda((depth0 != null ? depth0['facet-hide'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers.unless.call(depth0, (data && data.index), {"name":"unless","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\" >\r\n";
},"3":function(depth0,helpers,partials,data) {
  return "no-top-border";
  },"5":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, buffer = "         <li class=\"LT5Facets ";
  stack1 = lambda((depth0 != null ? depth0['facet-hide'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers.unless.call(depth0, (data && data.index), {"name":"unless","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\" >\r\n";
},"7":function(depth0,helpers,partials,data) {
  return "              <span class=\"icon-checkmark mblCheckmark\"></span>\r\n";
  },"9":function(depth0,helpers,partials,data) {
  return "              <span class=\"icon-checkmark mblCheckmark visibilty-hidden\"></span>\r\n";
  },"11":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "                  <label class=\"facetsCheckbox checked\">\r\n                  <input type=\"checkbox\" class=\"facetBox\" "
    + escapeExpression(lambda((depth0 != null ? depth0.disabled : depth0), depth0))
    + "  value=\"";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-link=\""
    + escapeExpression(lambda((depth0 != null ? depth0.undolink : depth0), depth0))
    + "\" data-title=\"";
  stack1 = lambda((depths[2] != null ? depths[2]['facet-title'] : depths[2]), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-key=\"";
  stack1 = lambda((depths[2] != null ? depths[2]['facet-key'] : depths[2]), depth0);
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depths[2] != null ? depths[2]['facet-has-children'] : depths[2]), {"name":"if","hash":{},"fn":this.program(12, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\"  data-name=\"";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" checked>\r\n\r\n";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-name'] : depth0), "eqi", "All", {"name":"compare","hash":{},"fn":this.program(14, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-name'] : depth0), "neq", "All", {"name":"compare","hash":{},"fn":this.program(16, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                  </label>\r\n\r\n";
},"12":function(depth0,helpers,partials,data,depths) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return escapeExpression(lambda((depths[3] != null ? depths[3]['parent-suffix'] : depths[3]), depth0));
  },"14":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, buffer = "                    <span class=\"facetName\">";
  stack1 = lambda(((stack1 = (depths[3] != null ? depths[3]['facet-values'] : depths[3])) != null ? stack1.ALL_TEXT : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span>\r\n";
},"16":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, buffer = "                    <span class=\"facetName\">";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "</span>\r\n\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['facet-children'] : depth0), {"name":"if","hash":{},"fn":this.program(17, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n";
},"17":function(depth0,helpers,partials,data) {
  return "                      <span class=\"icon-chevron-down pull-right nestedFacetsToogleBtn\" role=\"button\" aria-expanded=\"false\" tabindex=\"0\"></span>\r\n";
  },"19":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "                  <label class=\"facetsCheckbox\">\r\n                  <input type=\"checkbox\" class=\"facetBox\" "
    + escapeExpression(lambda((depth0 != null ? depth0.disabled : depth0), depth0))
    + " value=\"";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\"  data-link=\""
    + escapeExpression(lambda((depth0 != null ? depth0.link : depth0), depth0))
    + "\" data-title=\"";
  stack1 = lambda((depths[2] != null ? depths[2]['facet-title'] : depths[2]), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-key=\"";
  stack1 = lambda((depths[2] != null ? depths[2]['facet-key'] : depths[2]), depth0);
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depths[2] != null ? depths[2]['facet-has-children'] : depths[2]), {"name":"if","hash":{},"fn":this.program(12, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-name=\"";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\r\n\r\n";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-name'] : depth0), "eqi", "All", {"name":"compare","hash":{},"fn":this.program(20, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-name'] : depth0), "neq", "All", {"name":"compare","hash":{},"fn":this.program(22, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                  </label>\r\n";
},"20":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, buffer = "                     <span class=\"facetName\">";
  stack1 = lambda(((stack1 = (depths[3] != null ? depths[3]['facet-values'] : depths[3])) != null ? stack1.ALL_TEXT : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span>\r\n";
},"22":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, buffer = "                    <span class=\"facetName\">";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "</span>\r\n\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['facet-children'] : depth0), {"name":"if","hash":{},"fn":this.program(23, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n";
},"23":function(depth0,helpers,partials,data) {
  return "                    <span class=\"icon-chevron-down pull-right nestedFacetsToogleBtn\" role=\"button\" aria-expanded=\"false\" tabindex=\"0\"></span>\r\n";
  },"25":function(depth0,helpers,partials,data,depths) {
  var stack1, buffer = "\r\n            <ul class=\"nestedFacets\">\r\n";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 != null ? depth0['facet-children'] : depth0)) != null ? stack1['facet-child'] : stack1), {"name":"each","hash":{},"fn":this.program(26, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </ul>\r\n";
},"26":function(depth0,helpers,partials,data,depths) {
  var stack1, buffer = "               <li class=\"LT5Facets\">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['facet-selected'] : depth0), {"name":"if","hash":{},"fn":this.program(27, data, depths),"inverse":this.program(36, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "               </li>\r\n";
},"27":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['facet-selected'] : depth0), {"name":"if","hash":{},"fn":this.program(28, data, depths),"inverse":this.program(30, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                  <label class=\"facetsCheckbox checked\">\r\n                  <input type=\"checkbox\" class=\"facetBox\"  value=\"";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-link=\""
    + escapeExpression(lambda((depth0 != null ? depth0.undolink : depth0), depth0))
    + "\" data-parent=\"";
  stack1 = lambda((depths[2] != null ? depths[2]['facet-name'] : depths[2]), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-title=\"";
  stack1 = lambda((depths[4] != null ? depths[4]['facet-title'] : depths[4]), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-key=\"";
  stack1 = lambda((depths[4] != null ? depths[4]['facet-key'] : depths[4]), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += escapeExpression(lambda((depths[4] != null ? depths[4]['child-suffix'] : depths[4]), depth0))
    + "\" data-name=\"";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" checked>\r\n";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-name'] : depth0), "eqi", ((stack1 = (depths[2] != null ? depths[2]['facet-values'] : depths[2])) != null ? stack1.ALL_TEXT : stack1), {"name":"compare","hash":{},"fn":this.program(32, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['facet-name'] : depth0), "neq", ((stack1 = (depths[2] != null ? depths[2]['facet-values'] : depths[2])) != null ? stack1.ALL_TEXT : stack1), {"name":"compare","hash":{},"fn":this.program(34, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"28":function(depth0,helpers,partials,data) {
  return "                    <span class=\"icon-checkmark mblCheckmark\"></span>\r\n";
  },"30":function(depth0,helpers,partials,data) {
  return "                     <span class=\"icon-checkmark mblCheckmark visibilty-hidden\"></span>\r\n";
  },"32":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, buffer = "                     <span class=\"facetName\">";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span></label>\r\n";
},"34":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, buffer = "                    <span class=\"facetName\">";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span></label>\r\n";
},"36":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "                  <span class=\"icon-checkmark mblCheckmark visibilty-hidden\"></span>\r\n                  <label class=\"facetsCheckbox\">\r\n                  <input type=\"checkbox\" class=\"facetBox\" value=\"";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\"  data-link=\""
    + escapeExpression(lambda((depth0 != null ? depth0.link : depth0), depth0))
    + "\" data-parent=\"";
  stack1 = lambda((depths[2] != null ? depths[2]['facet-name'] : depths[2]), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-title=\"";
  stack1 = lambda((depths[4] != null ? depths[4]['facet-title'] : depths[4]), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" data-key=\"";
  stack1 = lambda((depths[4] != null ? depths[4]['facet-key'] : depths[4]), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += escapeExpression(lambda((depths[4] != null ? depths[4]['child-suffix'] : depths[4]), depth0))
    + "\" data-name=\"";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\r\n                  <span class=\"facetName\">";
  stack1 = lambda((depth0 != null ? depth0['facet-name'] : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span></label>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, buffer = "\r\n   <div class=\"facetsContainer\">\r\n      <ul class=\"facetsOptions\">\r\n";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 != null ? depth0['facet-values'] : depth0)) != null ? stack1['facet-item'] : stack1), {"name":"each","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "      </ul>\r\n      <div class=\"dottedLine\"></div>\r\n   </div>\r\n";
},"useData":true,"useDepths":true});



this["Handlebars"]["templates"]["resultlistingb-resultSet"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "        <div class=\"badge\">\r\n            <span class=\"icon-star-badge\"></span>\r\n        </div>\r\n";
  },"3":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "            <h3 class=\"alt-secondary-head tertiary-trapezoid-bg image-title\">\r\n                <span>\r\n                    "
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Contact_FN : depth0), depth0))
    + " "
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Contact_LN : depth0), depth0))
    + "\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.KPMG_Contact_City : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.program(6, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                </span>\r\n            </h3>\r\n";
},"4":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    &#124; "
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Contact_City : depth0), depth0))
    + ", "
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Contact_Country : depth0), depth0))
    + "\r\n";
},"6":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    &#124; "
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Contact_Country : depth0), depth0))
    + "\r\n";
},"8":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <p class=\"peopleDetails\">"
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Contact_Job_Ttl : depth0), depth0))
    + "</p>\r\n";
},"10":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <span class=\"icon-date "
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Cont_Type_Path : depth0), depth0))
    + " icon\"></span>\r\n";
},"12":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0.KPMG_Tab_Type : depth0), "neq", "people", {"name":"compare","hash":{},"fn":this.program(13, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"13":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0.KPMG_Tab_Type : depth0), "neq", "People", {"name":"compare","hash":{},"fn":this.program(14, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"14":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <span class=\"icon-"
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Article_Primary_Format : depth0), depth0))
    + " icon\"></span>\r\n";
},"16":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <p class=\"contact-tabs-date contact-tabs-date-insights\">"
    + escapeExpression(((helpers.formatDate || (depth0 && depth0.formatDate) || helperMissing).call(depth0, (depth0 != null ? depth0.KPMG_Article_Date : depth0), {"name":"formatDate","hash":{},"data":data})))
    + "</p>\r\n";
},"18":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.KPMG_Event_Start_Date : depth0), {"name":"if","hash":{},"fn":this.program(19, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"19":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <p class=\"contact-tabs-date\">"
    + escapeExpression(((helpers.formatDate || (depth0 && depth0.formatDate) || helperMissing).call(depth0, (depth0 != null ? depth0.KPMG_Event_Start_Date : depth0), {"name":"formatDate","hash":{},"data":data})))
    + "</p>\r\n";
},"21":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <p class=\"contact-tabs-date event-type\">"
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Event_Type : depth0), depth0))
    + "</p>\r\n";
},"23":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    <div class=\"cta-space\">&nbsp;</div>\r\n                    <div class=\" pull-right\">\r\n                        <span class=\"btn-cta contact-btn\" tabindex=\"0\">\r\n                            <span class=\"icon-email\"></span>\r\n                            <span data-modal-url=\"/etc/partials/kpmgpublic/peoplecontactform/peoplecontactform.html\" data-backdrop=\"static\" data-keyboard=\"false\" data-remote=\""
    + escapeExpression(lambda((depth0 != null ? depth0.peopleContactFormLink : depth0), depth0))
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_URL : depth0), depth0))
    + "\" class=\"contact people-connect btn-modal pcfLink component-data-link modal-open\">"
    + escapeExpression(lambda((depth0 != null ? depth0.contactFormLinkCopy : depth0), depth0))
    + "</span>\r\n                        </span>\r\n                    </div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, buffer = "<a title=\""
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Title : depth0), depth0))
    + "\" href=\""
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_URL : depth0), depth0))
    + "\" tabindex=\"-1\">\r\n    <div class=\"result "
    + escapeExpression(lambda((depth0 != null ? depth0.resultsView : depth0), depth0))
    + " col-md-height col-sm-height col-full-height\" tabindex=\"0\">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.favourite : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        <div class=\"imgContainer\">\r\n            <img src=\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 237 158'%2F%3E\" data-src=\"\" data-desktop=\""
    + escapeExpression(((helper = (helper = helpers.assetDomainName || (depth0 != null ? depth0.assetDomainName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"assetDomainName","hash":{},"data":data}) : helper)))
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Image : depth0), depth0))
    + "/jcr:content/renditions/cq5dam.web.237.158.jpg\" data-mobile=\""
    + escapeExpression(((helper = (helper = helpers.assetDomainName || (depth0 != null ? depth0.assetDomainName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"assetDomainName","hash":{},"data":data}) : helper)))
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Image : depth0), depth0))
    + "/jcr:content/renditions/cq5dam.web.512.341.jpg\" alt=\""
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Title : depth0), depth0))
    + "\" class=\"img-responsive lazy\" />\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.KPMG_Contact_FN : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        </div>\r\n        <div class=\"textContainer\">\r\n            <h3 class=\"secondary-head line-clamp line-clamp-3\"><p> "
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Title : depth0), depth0))
    + " </p></h3>\r\n";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0.KPMG_Tab_Type : depth0), "eqi", "people", {"name":"compare","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0.KPMG_Tab_Type : depth0), "eqi", "events", {"name":"compare","hash":{},"fn":this.program(10, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0.KPMG_Tab_Type : depth0), "neq", "events", {"name":"compare","hash":{},"fn":this.program(12, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.KPMG_Article_Date : depth0), {"name":"if","hash":{},"fn":this.program(16, data),"inverse":this.program(18, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.KPMG_Event_Type : depth0), {"name":"if","hash":{},"fn":this.program(21, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n            <p class=\"description line-clamp line-clamp-5\">"
    + escapeExpression(lambda((depth0 != null ? depth0.KPMG_Short_Desc : depth0), depth0))
    + "</p>\r\n\r\n            <div class=\"row\">\r\n                <div class=\"contactFmLink\">\r\n";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0.KPMG_Tab_Type : depth0), "eqi", "people", {"name":"compare","hash":{},"fn":this.program(23, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                </div>\r\n                <div class=\" quickView desktop-only\">\r\n                    <div class=\"cta-space\">&nbsp;</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</a>\r\n";
},"useData":true});



this["Handlebars"]["templates"]["resultlistingb-searchHeader"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<div class=\"resultFound\">\r\n  \r\n   <div class=\"noDataFound\">\r\n      <p>"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.CQModel : depth0)) != null ? stack1.i18nModel : stack1)) != null ? stack1.noResultsCopy : stack1), depth0))
    + "</p>\r\n      <h3>Suggestions</h3>\r\n      <p>"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.CQModel : depth0)) != null ? stack1.i18nModel : stack1)) != null ? stack1.noResultsCopyLineOne : stack1), depth0))
    + "</p>\r\n      <p>"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.CQModel : depth0)) != null ? stack1.i18nModel : stack1)) != null ? stack1.noResultsCopyLineTwo : stack1), depth0))
    + "</p>\r\n      <p>"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.CQModel : depth0)) != null ? stack1.i18nModel : stack1)) != null ? stack1.noResultsCopyLineThree : stack1), depth0))
    + "</p>\r\n   </div>\r\n</div>\r\n<div class=\"sortByContainer\">\r\n   <div class=\"sortBy\">\r\n   <div class=\"refineButton\">\r\n         <span class=\"icon-chevron-right\"></span>\r\n         <span class=\"component-link facets-refine-btn\" href=\"#\" title=\"REFINE SEARCH\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.CQModel : depth0)) != null ? stack1.i18nModel : stack1)) != null ? stack1.title : stack1), depth0))
    + "</span>\r\n      </div>\r\n   </div>\r\n</div>";
},"useData":true});



this["Handlebars"]["templates"]["latestdropdown"] = Handlebars.template({"1":function(depth0,helpers,partials,data,depths) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['display-name'] : depth0), "neq", "Most Relevant", {"name":"compare","hash":{},"fn":this.program(2, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "            <li class=\"LT5Facets custom-list ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.selected : depth0), {"name":"if","hash":{},"fn":this.program(3, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers.unless.call(depth0, (data && data.index), {"name":"unless","hash":{},"fn":this.program(5, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" value=\""
    + escapeExpression(lambda((depth0 != null ? depth0['display-name'] : depth0), depth0))
    + "\"  title=\""
    + escapeExpression(lambda((depth0 != null ? depth0['display-name'] : depth0), depth0))
    + "\" data-link=\""
    + escapeExpression(lambda((depth0 != null ? depth0.link : depth0), depth0))
    + "\" tabindex=\"0\">\r\n                  <span class=\"facetName\">\r\n";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['display-name'] : depth0), "eqi", "Most Viewed", {"name":"compare","hash":{},"fn":this.program(7, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['display-name'] : depth0), "eqi", "Most Popular", {"name":"compare","hash":{},"fn":this.program(9, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0['display-name'] : depth0), "eqi", "By Date", {"name":"compare","hash":{},"fn":this.program(11, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                  </span>\r\n            </li>\r\n";
},"3":function(depth0,helpers,partials,data) {
  return "selected";
  },"5":function(depth0,helpers,partials,data) {
  return "no-top-border";
  },"7":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                              "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depths[3] != null ? depths[3].CQModel : depths[3])) != null ? stack1.i18nModel : stack1)) != null ? stack1.sortingViewed : stack1), depth0))
    + "\r\n";
},"9":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                              "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depths[3] != null ? depths[3].CQModel : depths[3])) != null ? stack1.i18nModel : stack1)) != null ? stack1.sortingPopular : stack1), depth0))
    + "\r\n";
},"11":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                              "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depths[3] != null ? depths[3].CQModel : depths[3])) != null ? stack1.i18nModel : stack1)) != null ? stack1.sortingDate : stack1), depth0))
    + "\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, buffer = "<div class=\"facetsContainer\">\r\n      <ul class=\"facetsOptions\">\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.SelectBoxOptions : depth0), {"name":"each","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "      </ul>\r\n</div>\r\n";
},"useData":true,"useDepths":true});



this["Handlebars"]["templates"]["latesteventsdropdown"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "        <li class=\"LT5Facets custom-list ";
  stack1 = helpers.unless.call(depth0, (data && data.index), {"name":"unless","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\" value=\""
    + escapeExpression(lambda((depth0 != null ? depth0['display-name'] : depth0), depth0))
    + "\" title=\""
    + escapeExpression(lambda((depth0 != null ? depth0['display-name'] : depth0), depth0))
    + "\" data-link=\""
    + escapeExpression(lambda((depth0 != null ? depth0.link : depth0), depth0))
    + "\" tabindex=\"0\">\r\n            <span class=\"facetName\">\r\n                "
    + escapeExpression(lambda((depth0 != null ? depth0['display-name'] : depth0), depth0))
    + "\r\n            </span>\r\n        </li>\r\n";
},"2":function(depth0,helpers,partials,data) {
  return "no-top-border";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"facetsContainer\">\r\n    <ul class=\"facetsOptions\">\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.eventDropdownOptions : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </ul>\r\n</div>\r\n";
},"useData":true});



this["Handlebars"]["templates"]["peoplecontactform-formReciept"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <p>\r\n                <label>"
    + escapeExpression(((helper = (helper = helpers.phoneLabel || (depth0 != null ? depth0.phoneLabel : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"phoneLabel","hash":{},"data":data}) : helper)))
    + ":</label>\r\n                <span>"
    + escapeExpression(((helper = (helper = helpers.phone || (depth0 != null ? depth0.phone : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"phone","hash":{},"data":data}) : helper)))
    + "</span>\r\n            </p>\r\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <p>\r\n                <label>"
    + escapeExpression(((helper = (helper = helpers.companyLabel || (depth0 != null ? depth0.companyLabel : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"companyLabel","hash":{},"data":data}) : helper)))
    + ":</label>\r\n                <span>"
    + escapeExpression(((helper = (helper = helpers.organization || (depth0 != null ? depth0.organization : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"organization","hash":{},"data":data}) : helper)))
    + "</span>\r\n            </p>\r\n";
},"5":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <p>\r\n                <label>"
    + escapeExpression(((helper = (helper = helpers.roleLabel || (depth0 != null ? depth0.roleLabel : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"roleLabel","hash":{},"data":data}) : helper)))
    + ":</label>\r\n                <span>"
    + escapeExpression(((helper = (helper = helpers.role || (depth0 != null ? depth0.role : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"role","hash":{},"data":data}) : helper)))
    + "</span>\r\n            </p>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = " <div class=\"row\"> \r\n    <div class=\"row receiptWrapper\" >\r\n        <div class=\"col-md-12 print-no-left-right-padding\">\r\n            <h1 class=\"primary-head\">"
    + escapeExpression(((helper = (helper = helpers.shortTitle || (depth0 != null ? depth0.shortTitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"shortTitle","hash":{},"data":data}) : helper)))
    + "</h1>\r\n            <p class=\"imargin\">"
    + escapeExpression(((helper = (helper = helpers.shortDescription || (depth0 != null ? depth0.shortDescription : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"shortDescription","hash":{},"data":data}) : helper)))
    + "</p>    \r\n            <p class=\"dotted-border-top\"></p>                       \r\n        </div>\r\n        <div class=\"col-md-12 receipient\">\r\n            <p class=\"mBottom\">\r\n                <label>"
    + escapeExpression(((helper = (helper = helpers.receipentLabel || (depth0 != null ? depth0.receipentLabel : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"receipentLabel","hash":{},"data":data}) : helper)))
    + ":</label>\r\n                <span>"
    + escapeExpression(((helper = (helper = helpers.receipent || (depth0 != null ? depth0.receipent : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"receipent","hash":{},"data":data}) : helper)))
    + "</span>\r\n            </p>\r\n            <p>\r\n                <label>"
    + escapeExpression(((helper = (helper = helpers.nameLabel || (depth0 != null ? depth0.nameLabel : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"nameLabel","hash":{},"data":data}) : helper)))
    + ":</label>\r\n                <span>"
    + escapeExpression(((helper = (helper = helpers.userName || (depth0 != null ? depth0.userName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"userName","hash":{},"data":data}) : helper)))
    + "</span>\r\n            </p>\r\n            <p>\r\n                <label>"
    + escapeExpression(((helper = (helper = helpers.emailLabel || (depth0 != null ? depth0.emailLabel : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"emailLabel","hash":{},"data":data}) : helper)))
    + ":</label>\r\n                <span>"
    + escapeExpression(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"email","hash":{},"data":data}) : helper)))
    + "</span>\r\n            </p>                        \r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.phone : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "            \r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.organization : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.role : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            <p class=\"msgtop\">\r\n                <label>"
    + escapeExpression(((helper = (helper = helpers.messageLabel || (depth0 != null ? depth0.messageLabel : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"messageLabel","hash":{},"data":data}) : helper)))
    + ":</label>\r\n                <div class=\"clearfix\"><p class=\"mwidth\"><em>"
    + escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"message","hash":{},"data":data}) : helper)))
    + "</em></p></div>\r\n            </p>\r\n            <p class=\"dotted-border-top\"></p>\r\n        </div>\r\n    \r\n        <div class=\"row\">\r\n            <div class=\"col-md-12 print-no-left-right-padding\">\r\n                <p class=\"rec_print\">                  \r\n                    <a class=\"btn-cta pcf-print-link pull-right\" title=\""
    + escapeExpression(((helper = (helper = helpers.printLabel || (depth0 != null ? depth0.printLabel : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"printLabel","hash":{},"data":data}) : helper)))
    + "\" href=\"#\" >\r\n                        <span class=\"icon-print\"></span>\r\n                        <span class=\"print-text\">"
    + escapeExpression(((helper = (helper = helpers.printLabel || (depth0 != null ? depth0.printLabel : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"printLabel","hash":{},"data":data}) : helper)))
    + " </span>\r\n                    </a>\r\n                </p>\r\n            </div>\r\n            <div class=\"col-md-12\">\r\n             <p class=\"closebottom\">                \r\n            <a href=\"javascript:void(0);\" class=\"component-link pull-right\" data-dismiss=\"modal\">\r\n                        <span class=\"icon-chevron-right\"></span>\r\n                        <span class=\"close-text\"> "
    + escapeExpression(((helper = (helper = helpers.closeLabel || (depth0 != null ? depth0.closeLabel : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"closeLabel","hash":{},"data":data}) : helper)))
    + "\r\n            </a>\r\n            </p>\r\n            </div>\r\n        </div>            \r\n    </div>\r\n</div>\r\n";
},"useData":true});



this["Handlebars"]["templates"]["formReciept"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <p>\r\n                <label>"
    + escapeExpression(((helper = (helper = helpers.phoneLabel || (depth0 != null ? depth0.phoneLabel : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"phoneLabel","hash":{},"data":data}) : helper)))
    + ":</label>\r\n                <span>"
    + escapeExpression(((helper = (helper = helpers.phone || (depth0 != null ? depth0.phone : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"phone","hash":{},"data":data}) : helper)))
    + "</span>\r\n            </p>\r\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <p>\r\n                <label>"
    + escapeExpression(((helper = (helper = helpers.companyLabel || (depth0 != null ? depth0.companyLabel : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"companyLabel","hash":{},"data":data}) : helper)))
    + ":</label>\r\n                <span>"
    + escapeExpression(((helper = (helper = helpers.organization || (depth0 != null ? depth0.organization : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"organization","hash":{},"data":data}) : helper)))
    + "</span>\r\n            </p>\r\n";
},"5":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <p>\r\n                <label>"
    + escapeExpression(((helper = (helper = helpers.roleLabel || (depth0 != null ? depth0.roleLabel : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"roleLabel","hash":{},"data":data}) : helper)))
    + ":</label>\r\n                <span>"
    + escapeExpression(((helper = (helper = helpers.role || (depth0 != null ? depth0.role : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"role","hash":{},"data":data}) : helper)))
    + "</span>\r\n            </p>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"row\"> \r\n    <div class=\"row receiptWrapper\" >\r\n        <div class=\"col-md-12  print-no-left-right-padding\">\r\n            <h1 class=\"primary-head\">"
    + escapeExpression(((helper = (helper = helpers.shortTitle || (depth0 != null ? depth0.shortTitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"shortTitle","hash":{},"data":data}) : helper)))
    + "</h1>\r\n            <p class=\"imargin\">"
    + escapeExpression(((helper = (helper = helpers.shortDescription || (depth0 != null ? depth0.shortDescription : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"shortDescription","hash":{},"data":data}) : helper)))
    + "</p>  \r\n            <p class=\"dotted-border-top\"></p>                       \r\n        </div>\r\n        <div class=\"col-md-12 receipient\">\r\n            <p>\r\n                <label>"
    + escapeExpression(((helper = (helper = helpers.inquiryLabel || (depth0 != null ? depth0.inquiryLabel : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"inquiryLabel","hash":{},"data":data}) : helper)))
    + ":</label>\r\n                <span>"
    + escapeExpression(((helper = (helper = helpers.inquiry || (depth0 != null ? depth0.inquiry : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"inquiry","hash":{},"data":data}) : helper)))
    + "</span>\r\n            </p>\r\n             <p class=\"mBottom\">\r\n                <label>"
    + escapeExpression(((helper = (helper = helpers.locationLabel || (depth0 != null ? depth0.locationLabel : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"locationLabel","hash":{},"data":data}) : helper)))
    + ":</label>\r\n                <span>"
    + escapeExpression(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"location","hash":{},"data":data}) : helper)))
    + "</span>\r\n            </p>           \r\n            <p>\r\n                <label>"
    + escapeExpression(((helper = (helper = helpers.nameLabel || (depth0 != null ? depth0.nameLabel : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"nameLabel","hash":{},"data":data}) : helper)))
    + ":</label>\r\n                <span>"
    + escapeExpression(((helper = (helper = helpers.userName || (depth0 != null ? depth0.userName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"userName","hash":{},"data":data}) : helper)))
    + "</span>\r\n            </p>\r\n            <p>\r\n                <label>"
    + escapeExpression(((helper = (helper = helpers.emailLabel || (depth0 != null ? depth0.emailLabel : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"emailLabel","hash":{},"data":data}) : helper)))
    + ":</label>\r\n                <span>"
    + escapeExpression(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"email","hash":{},"data":data}) : helper)))
    + "</span>\r\n            </p>                        \r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.phone : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "            \r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.organization : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.role : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n            <p class=\"msgtop\"><label>"
    + escapeExpression(((helper = (helper = helpers.messageLabel || (depth0 != null ? depth0.messageLabel : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"messageLabel","hash":{},"data":data}) : helper)))
    + ":</label>\r\n            <div class=\"clearfix\"><p><em>"
    + escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"message","hash":{},"data":data}) : helper)))
    + "</em></p></div>\r\n            </p>\r\n            <p class=\"dotted-border-top\"></p>\r\n        </div>\r\n    \r\n       <div class=\"row\">\r\n            <div class=\"col-md-12 print-no-left-right-padding\">\r\n                <p class=\"rec_print\">                   \r\n                    <a class=\"btn-cta cf-print-link pull-right\" title=\""
    + escapeExpression(((helper = (helper = helpers.printLabel || (depth0 != null ? depth0.printLabel : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"printLabel","hash":{},"data":data}) : helper)))
    + "\" href=\"#\" >\r\n                        <span class=\"icon-print\"></span>\r\n                        <span class=\"print-text\"> "
    + escapeExpression(((helper = (helper = helpers.printLabel || (depth0 != null ? depth0.printLabel : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"printLabel","hash":{},"data":data}) : helper)))
    + " </span>\r\n                    </a>\r\n\r\n                </p>\r\n                </div>\r\n            <div class=\"col-md-12\">\r\n             <p class=\"closebottom\">                \r\n                <a href=\"javascript:void(0);\" class=\"component-link pull-right\" data-dismiss=\"modal\">\r\n                    <span class=\"icon-chevron-right formReceiptCloseIcon\"></span>\r\n                    <span class=\"close-text\"> "
    + escapeExpression(((helper = (helper = helpers.closeLabel || (depth0 != null ? depth0.closeLabel : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"closeLabel","hash":{},"data":data}) : helper)))
    + " </span>\r\n                </a>\r\n             </p>\r\n            </div>\r\n        </div>          \r\n    </div>\r\n</div>";
},"useData":true});



this["Handlebars"]["templates"]["template-articlesremoved"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.articlesRemoved : stack1)) != null ? stack1.notlongeravailable : stack1), depth0))
    + "\r\n";
},"3":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.notlongeravailable", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                            "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.articlesRemoved : stack1)) != null ? stack1.articlenolongeravailabledescription : stack1), depth0))
    + "\r\n";
},"7":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                            "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.articlenolongeravailabledescription", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"9":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                            "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.articlesRemoved : stack1)) != null ? stack1.articlewasremovedfromlabel : stack1), depth0))
    + "\r\n";
},"11":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                            "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.articlewasremovedfromlabel", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"13":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                            "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.articlesRemoved : stack1)) != null ? stack1.mobilenolongeravlbl : stack1), depth0))
    + "\r\n";
},"15":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                            "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.mobilenolongeravlbl", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"17":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                            "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.articlesRemoved : stack1)) != null ? stack1.artitwasremovedfrom : stack1), depth0))
    + "\r\n";
},"19":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                            "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.artitwasremovedfrom", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"21":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                            "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.articlesRemoved : stack1)) != null ? stack1.articlesnolongeravailabledescription : stack1), depth0))
    + "\r\n";
},"23":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                            "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.articlesnolongeravailabledescription", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"25":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                            "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.articlesRemoved : stack1)) != null ? stack1.close : stack1), depth0))
    + "\r\n";
},"27":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                            "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.close", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"defaultoverlay clearfix\">\r\n    <div class=\"overlay-header hidden-xs \" role=\"header\">\r\n        <h4 class=\"heading\" id=\"myModalLabel\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.articlesRemoved : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        </h4>\r\n        <hr class=\"divider\"/>\r\n    </div>\r\n    <div class=\"overlay-content\" role=\"main\">\r\n        <div class=\"overlay-content-inner\">\r\n            <div class=\"description\" id=\"description\">\r\n                <div class=\"singlearticle description-item\">\r\n                <div class=\"desktop-only\">\r\n                    <div>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.articlesRemoved : stack1), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.program(7, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                    </div>\r\n                    <ul class=\"list\"></ul>\r\n                    <div>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.articlesRemoved : stack1), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.program(11, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                    </div>\r\n                    <div class=\"listname\"></div>\r\n                </div>\r\n                 <div class=\"mobile-only\">\r\n                    <ul class=\"list\" style=\"display:inline\"></ul>\r\n                    <div>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.articlesRemoved : stack1), {"name":"if","hash":{},"fn":this.program(13, data),"inverse":this.program(15, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                        .\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.articlesRemoved : stack1), {"name":"if","hash":{},"fn":this.program(17, data),"inverse":this.program(19, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                    </div>\r\n                    <div class=\"listname\" style=\"display:inline\"></div>\r\n                </div>\r\n\r\n                </div>\r\n                <div class=\"multiplearticles description-item\">\r\n                    <div>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.articlesRemoved : stack1), {"name":"if","hash":{},"fn":this.program(21, data),"inverse":this.program(23, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                    <span class=\"listname\"></span>:</div>\r\n                    <ul class=\"list\"></ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"overlay-footer  hidden-xs\" role=\"footer\">\r\n        <div class=\"row \">\r\n            <div class=\"col-md-6 last-column pull-right\">\r\n                <div class=\"savearticle-controls\">\r\n                    <button class=\"btn btn-cta btn-default\"  data-dismiss=\"modal\" type=\"button\">\r\n                        <span class=\"icon-chevron-right\">\r\n                        </span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.articlesRemoved : stack1), {"name":"if","hash":{},"fn":this.program(25, data),"inverse":this.program(27, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                    </button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});



this["Handlebars"]["templates"]["template-deletearticle"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.deleteArticle : stack1)) != null ? stack1.deleteThisArticle : stack1), depth0))
    + "\r\n";
},"3":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.librarylist.deleteThisArticle", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.deleteArticle : stack1)) != null ? stack1.deleteThisArticleDescription : stack1), depth0))
    + "\r\n";
},"7":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                    "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.deleteThisArticleDescription", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"9":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.deleteArticle : stack1)) != null ? stack1.successDescription : stack1), depth0))
    + "\r\n";
},"11":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.successDescription", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"13":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                            "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.deleteArticle : stack1)) != null ? stack1.deleteIt : stack1), depth0))
    + "\r\n";
},"15":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                            "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.deleteIt", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"17":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                                "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.deleteArticle : stack1)) != null ? stack1.close : stack1), depth0))
    + "\r\n";
},"19":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                                "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.close", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"defaultoverlay clearfix\">\r\n    <div class=\"overlay-header\" role=\"header\">\r\n        <h4 class=\"heading\" id=\"myModalLabel\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.deleteArticle : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        </h4>\r\n        <hr class=\"divider\"/>\r\n    </div>\r\n    <div class=\"overlay-content\" role=\"main\">\r\n        <div class=\"overlay-content-inner\">\r\n             <p class=\"description\" id=\"description\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.deleteArticle : stack1), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.program(7, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "            </p>\r\n            <div class=\"alert articlename\" role=\"alert\">\r\n            </div>\r\n        </div>\r\n        <div class=\"alert alert-success\" role=\"alert\">\r\n            <span class=\"icon-checkmark\"></span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.deleteArticle : stack1), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.program(11, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        </div>\r\n    </div>\r\n    <div class=\"overlay-footer\" role=\"footer\">\r\n        <div class=\"row \">\r\n            <div class=\"col-md-6 last-column col-md-push-6\">\r\n                <div class=\"savearticle-controls\">\r\n                    <button class=\"btn btn-cta btn-default\" id=\"deletearticlebtn\" type=\"button\">\r\n                        <span class=\"icon-chevron-right\">\r\n                        </span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.deleteArticle : stack1), {"name":"if","hash":{},"fn":this.program(13, data),"inverse":this.program(15, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                    </button>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-md-6 col-md-pull-6\">\r\n                <div class=\"savearticle-controls\">\r\n                    <a class=\"btn-cta btn-cancel\" href=\"#\" id=\"cancelaction\" data-dismiss=\"modal\">\r\n                        <span class=\"icon-close\">\r\n                        </span>\r\n                        <span class=\"cancel\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.deleteArticle : stack1), {"name":"if","hash":{},"fn":this.program(17, data),"inverse":this.program(19, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                        </span>\r\n                    </a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});



this["Handlebars"]["templates"]["template-movearticle"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1)) != null ? stack1.movearticle : stack1), depth0))
    + "\r\n";
},"3":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.addtolibraryoverlay.movearticle", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1)) != null ? stack1.instrutiontext : stack1), depth0))
    + "\r\n";
},"7":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.addtolibraryoverlay.instrutiontext", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"9":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                                "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1)) != null ? stack1.alreadysaved : stack1), depth0))
    + "\r\n";
},"11":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                                "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.addtolibraryoverlay.alreadysaved", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"13":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                                        "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1)) != null ? stack1.alreadysavedarticle : stack1), depth0))
    + "\r\n";
},"15":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                                        "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.addtolibraryoverlay.alreadysavedarticle", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"17":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                                            "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1)) != null ? stack1.choosealist : stack1), depth0))
    + "\r\n";
},"19":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                                            "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.addtolibraryoverlay.choosealist", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"21":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                                                    "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1)) != null ? stack1.searchLabel : stack1), depth0))
    + "\r\n";
},"23":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                                                    "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.public.list.sharelist.searchLabel", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"25":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                                                    "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1)) != null ? stack1.searchLibList : stack1), depth0))
    + "\r\n";
},"27":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                                                "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.public.list.sharelist.searchLibList", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"29":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                                            "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1)) != null ? stack1.createalist : stack1), depth0))
    + "\r\n";
},"31":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                                            "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.addtolibraryoverlay.createalist", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"33":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                                                        "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1)) != null ? stack1.thatNameIsTaken : stack1), depth0))
    + "\r\n";
},"35":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                                                        "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.thatNameIsTaken", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"37":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                                                        "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1)) != null ? stack1.empty : stack1), depth0))
    + "\r\n";
},"39":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                                                        "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.addtolibraryoverlay.empty", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"41":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                                                    "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1)) != null ? stack1.createalist : stack1), depth0))
    + "\r\n";
},"43":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                                                    "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.addtolibraryoverlay.createalist", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"45":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                                                "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1)) != null ? stack1.enternewlist : stack1), depth0))
    + "\r\n";
},"47":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                                                "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.movetolibraryoverlay.enternewlist", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"49":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                                                        "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1)) != null ? stack1.addtolibraryoverlayCancel : stack1), depth0))
    + "\r\n";
},"51":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                                                        "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.addtolibraryoverlay.cancel", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"53":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                                                        "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1)) != null ? stack1.createalist : stack1), depth0))
    + "\r\n";
},"55":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                                                        "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.addtolibraryoverlay.createalist", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"57":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                                        "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1)) != null ? stack1.move : stack1), depth0))
    + "\r\n";
},"59":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                                        "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.librarylist.move", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"61":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                                        "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1)) != null ? stack1.cancel : stack1), depth0))
    + "\r\n";
},"63":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                                        "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.librarylist.cancel", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"65":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1)) != null ? stack1.successDescription : stack1), depth0))
    + "\r\n";
},"67":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                    "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.successDescription", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"move-article-overlay movearticle clearfix\">\r\n    <div class=\"overlay-header\" role=\"header\">\r\n                <h1 class=\"heading\" id=\"myModalLabel\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                </h1>\r\n                 <p class=\"description mobile-only\" id=\"description\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.program(7, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                </p>\r\n                <h2 class=\"article-title mobile-only\"></h2>\r\n            </div>\r\n            <div class=\"overlay-content\" role=\"main\">\r\n                <div class=\"row-same-height row-full-height \" role=\"row\">\r\n                    <div class=\"col-md-6 col-md-height col-full-height col-top overlay-columns\">\r\n                        <section aria-describedby=\"savetolibrary\" class=\"overlay-column\" tabindex=\"0\">\r\n                            <input type=\"hidden\" id=\"alreadysavedmessage\" value=\"\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.program(11, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                            \">\r\n                            <div class=\"row alert-container hidden\" id=\"moveArticleError\">\r\n                                <div class=\"alert alert-error listnameexists\" role=\"alert\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1), {"name":"if","hash":{},"fn":this.program(13, data),"inverse":this.program(15, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                                </div>\r\n                                <div class=\"alert alert-error alreadysaved\" role=\"alert\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1), {"name":"if","hash":{},"fn":this.program(13, data),"inverse":this.program(15, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                                    <span></span>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"row desktop-only row-last\">\r\n                                <div class=\"col-md-12 article-container\">\r\n                                    <article class=\"article\" id=\"moveArticlePreview\">\r\n                                        <img alt=\"\" class=\"article-image\" src=\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 237 158'%2F%3E\">\r\n                                            <div class=\"article-body\">\r\n                                                <h2 class=\"article-title line-clamp line-clamp-1\">\r\n                                                </h2>\r\n                                                <p class=\"article-description line-clamp line-clamp-3\">\r\n                                                </p>\r\n                                            </div>\r\n                                        </img>\r\n                                    </article>\r\n                                </div>\r\n                            </div>\r\n                        </section>\r\n                    </div>\r\n                    <div class=\"col-md-6 col-md-height col-full-height col-top overlay-columns last-column\">\r\n                        <section aria-describedby=\"chooselist\" class=\"overlay-column\" tabindex=\"0\">\r\n                            <div class=\"row column-header\" role=\"columnheader\">\r\n                                <div class=\"col-md-12\">\r\n                                    <div class=\"choose-list \" id=\"chooselist\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1), {"name":"if","hash":{},"fn":this.program(17, data),"inverse":this.program(19, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"save-to-list-section\">\r\n                                <div class=\"search-container\">\r\n                                    <div class=\"search-input desktop-only\">\r\n                                        <div class=\"form-group\">\r\n                                            <label class=\"sr-only\" for=\"moveArticleSearch\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1), {"name":"if","hash":{},"fn":this.program(21, data),"inverse":this.program(23, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                                            </label>\r\n                                            <input class=\"search\" id=\"moveArticleSearch\" name=\"search\" placeholder=\"\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1), {"name":"if","hash":{},"fn":this.program(25, data),"inverse":this.program(27, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                                            \" type=\"text\"/>\r\n                                            <button class=\"submitSearch\" title=\"search\" type=\"submit\" value=\"Submit\">\r\n                                                <span class=\"icon-search\">\r\n                                                </span>\r\n                                            </button>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"search-list mobile-only\">\r\n                                        <div class=\"form-group custom-select\">\r\n                                            <label class=\"sr-only\" for=\"moveArticleLibrarylistdropdown\">\r\n                                            </label>\r\n                                            <select class=\"form-control full-width\" id=\"moveArticleLibrarylistdropdown\" name=\"librarylist\">\r\n                                            </select>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"list-container desktop-only\">\r\n                                    <ul class=\"list\" id=\"moveArticleLibrarylist\" role=\"list\">\r\n                                    </ul>\r\n                                </div>\r\n                                <div class=\"new-list-controls\">\r\n                                    <a class=\"btn-cta btn-newlist\" href=\"#\" id=\"moveArticleNewlistbtn\" tabindex=\"0\">\r\n                                        <span class=\"icon-add\">\r\n                                        </span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1), {"name":"if","hash":{},"fn":this.program(29, data),"inverse":this.program(31, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                                    </a>\r\n                                    <form action=\"\" aria-hidden=\"true\" class=\"form-createlist\" role=\"form\">\r\n                                        <div class=\"form-group\">\r\n                                            <span class=\"error mobile-only\" id=\"inputerror\" aria-hidden=\"true\">\r\n                                                <span class=\"listnameexists \" >\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1), {"name":"if","hash":{},"fn":this.program(33, data),"inverse":this.program(35, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                                                </span>\r\n                                                <span class=\"empty \" >\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1), {"name":"if","hash":{},"fn":this.program(37, data),"inverse":this.program(39, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                                                </span>\r\n                                            </span>\r\n                                            <label class=\"sr-only\" for=\"moveArticleNewlist\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1), {"name":"if","hash":{},"fn":this.program(41, data),"inverse":this.program(43, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                                            </label>\r\n                                            <input class=\"\" id=\"moveArticleNewlist\" placeholder=\"\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1), {"name":"if","hash":{},"fn":this.program(45, data),"inverse":this.program(47, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                                            \" type=\"text\" aria-labelledby=\"\">\r\n                                            </input>\r\n                                        </div>\r\n                                        <div class=\"row\">\r\n                                            <div class=\"col-xs-6\">\r\n                                                <a class=\"btn-cta btn-cancel\" href=\"#\" id=\"moveArticleCancelcreate\" tabindex=\"0\" type=\"cancel\">\r\n                                                    <span class=\"icon-close\">\r\n                                                    </span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1), {"name":"if","hash":{},"fn":this.program(49, data),"inverse":this.program(51, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                                                </a>\r\n                                            </div>\r\n                                            <div class=\"col-xs-6\">\r\n                                                <a class=\"btn-cta createListBtn trackable\" href=#\"\" id=\"moveArticleCreatelist\" tabindex=\"0\" type=\"submit\">\r\n                                                    <span class=\"icon-chevron-right\">\r\n                                                    </span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1), {"name":"if","hash":{},"fn":this.program(53, data),"inverse":this.program(55, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                                                </a>\r\n                                            </div>\r\n                                        </div>\r\n                                    </form>\r\n                                </div>\r\n                            </div>\r\n                        </section>\r\n                    </div>\r\n                </div>\r\n                <div class=\"overlay-footer\" role=\"footer\">\r\n                    <div class=\"row-same-height row-full-height \" role=\"row\">\r\n                        <div class=\"col-md-6 last-column col-md-push-6\">\r\n                            <div class=\"overlay-controls\">\r\n                                <button class=\"btn btn-cta btn-default\" id=\"moveArticleSavetolist\" type=\"button\">\r\n                                    <span class=\"icon-chevron-right\">\r\n                                    </span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1), {"name":"if","hash":{},"fn":this.program(57, data),"inverse":this.program(59, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                                </button>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6 col-md-pull-6\">\r\n                            <div class=\"overlay-controls\">\r\n                                <a class=\"btn-cta btn-cancel\" href=\"#\" id=\"moveArticleCancelaction\" data-dismiss=\"modal\">\r\n                                    <span class=\"icon-close\">\r\n                                    </span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1), {"name":"if","hash":{},"fn":this.program(61, data),"inverse":this.program(63, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                                </a>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"alert alert-success\" role=\"alert\">\r\n                <span class=\"icon-chevron-right\"></span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.moveArticle : stack1), {"name":"if","hash":{},"fn":this.program(65, data),"inverse":this.program(67, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </div>\r\n          </div>";
},"useData":true});



this["Handlebars"]["templates"]["template-sharearticle"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.shareArticle : stack1)) != null ? stack1.shareThisList : stack1), depth0))
    + "\r\n";
},"3":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.shareThisList", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.shareArticle : stack1)) != null ? stack1.shareThisListDescription : stack1), depth0))
    + "\r\n";
},"7":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                    "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.shareThisListDescription", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"9":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.shareArticle : stack1)) != null ? stack1.successDescription : stack1), depth0))
    + "\r\n";
},"11":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.successDescription", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"13":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                            "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.shareArticle : stack1)) != null ? stack1.copy : stack1), depth0))
    + "\r\n";
},"15":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                            "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.copy", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"17":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                            "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.shareArticle : stack1)) != null ? stack1.cancel : stack1), depth0))
    + "\r\n";
},"19":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                            "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.cancel", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"21":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                            "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.shareArticle : stack1)) != null ? stack1.close : stack1), depth0))
    + "\r\n";
},"23":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                            "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.close", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"defaultoverlay clearfix\">\r\n    <div class=\"overlay-header\" role=\"header\">\r\n        <h4 class=\"heading\" id=\"myModalLabel\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.shareArticle : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        </h4>\r\n        <hr class=\"divider\"/>\r\n    </div>\r\n    <div class=\"overlay-content\" role=\"main\">\r\n        <div class=\"overlay-content-inner\">\r\n            <p class=\"description\" id=\"description\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.shareArticle : stack1), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.program(7, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "            </p>\r\n            <input class=\"alert alert-info\"  type=\"text\" id=\"clipboardinput\" value=\"\"/>\r\n        </div>\r\n        <div class=\"alert alert-success\" role=\"alert\">\r\n            <span class=\"icon-chevron-right\"></span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.shareArticle : stack1), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.program(11, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        </div>\r\n    </div>\r\n    <div class=\"overlay-footer\" role=\"footer\">\r\n        <div class=\"row \">\r\n            <div class=\"col-md-6 last-column col-md-push-6\">\r\n                <div class=\"savearticle-controls\">\r\n                    <button class=\"btn btn-cta btn-default\" id=\"copytocb\" type=\"button\">\r\n                        <span class=\"icon-chevron-right\">\r\n                        </span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.shareArticle : stack1), {"name":"if","hash":{},"fn":this.program(13, data),"inverse":this.program(15, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                    </button>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-md-6 col-md-pull-6\">\r\n                <div class=\"savearticle-controls\">\r\n                    <a class=\"btn-cta btn-cancel cancel\" href=\"#\" id=\"cancelaction\" data-dismiss=\"modal\">\r\n                        <span class=\"icon-close\">\r\n                        </span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.shareArticle : stack1), {"name":"if","hash":{},"fn":this.program(17, data),"inverse":this.program(19, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                    </a>\r\n                    <button class=\"btn-cta close btn-default\" href=\"#\" data-dismiss=\"modal\">\r\n                        <span class=\"icon-close\">\r\n                        </span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.shareArticle : stack1), {"name":"if","hash":{},"fn":this.program(21, data),"inverse":this.program(23, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                    </button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});



this["Handlebars"]["templates"]["template-noarticleExists"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.noarticles : stack1)) != null ? stack1.errorTitle : stack1), depth0))
    + "\r\n";
},"3":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.public.list.sharelist.noArticleErrorTitle", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.noarticles : stack1)) != null ? stack1.errorMessage : stack1), depth0))
    + "\r\n";
},"7":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.public.list.sharelist.noArticleErrorMessage", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"9":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.noarticles : stack1)) != null ? stack1.errorDetail : stack1), depth0))
    + "\r\n";
},"11":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.public.list.sharelist.noArticleErrorDetail", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"13":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.noarticles : stack1)) != null ? stack1.errorDetail1 : stack1), depth0))
    + "\r\n";
},"15":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                    "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.public.list.sharelist.noArticleErrorDetail1", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"17":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.noarticles : stack1)) != null ? stack1.errorDetail2 : stack1), depth0))
    + "\r\n";
},"19":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.public.list.sharelist.noArticleErrorDetail2", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"21":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                            "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.noarticles : stack1)) != null ? stack1.searchLabel : stack1), depth0))
    + "\r\n";
},"23":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                            "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.public.list.sharelist.searchLabel", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"25":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.noarticles : stack1)) != null ? stack1.searchLibList : stack1), depth0))
    + "\r\n";
},"27":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.public.list.sharelist.searchLibList", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"col-md-12\">\r\n    <div class=\"error error-inline noarticleexists\">\r\n        <h4 class=\"errortitle\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.noarticles : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        </h4>\r\n        <p class=\"errormessage\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.noarticles : stack1), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.program(7, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n        </p>\r\n        <p class=\"errordetail\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.noarticles : stack1), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.program(11, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n            <a href=\"#\" class=\"errortohome\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.noarticles : stack1), {"name":"if","hash":{},"fn":this.program(13, data),"inverse":this.program(15, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n            </a>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.noarticles : stack1), {"name":"if","hash":{},"fn":this.program(17, data),"inverse":this.program(19, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        </p>\r\n        <div class=\"search-container\">\r\n            <div class=\"search-input\">\r\n                <div class=\"form-group\">\r\n                    <label class=\"sr-only\" for=\"search\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.noarticles : stack1), {"name":"if","hash":{},"fn":this.program(21, data),"inverse":this.program(23, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                    </label>\r\n                    <input class=\"search\" id=\"search\" name=\"search\" placeholder=\"\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.noarticles : stack1), {"name":"if","hash":{},"fn":this.program(25, data),"inverse":this.program(27, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                    \" type=\"text\" />\r\n                    <button class=\"submitSearch\" title=\"search\" type=\"submit\" value=\"Submit\">\r\n                        <span class=\"icon-search\">\r\n                        </span>\r\n                    </button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});



this["Handlebars"]["templates"]["template-createlistoverlay"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1)) != null ? stack1.createAList : stack1), depth0))
    + "\r\n";
},"3":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.createAList", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                                    "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1)) != null ? stack1.thatNameIsTaken : stack1), depth0))
    + "\r\n";
},"7":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                                    "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.thatNameIsTaken", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"9":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                                    "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1)) != null ? stack1.empty : stack1), depth0))
    + "\r\n";
},"11":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                                    "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.addtolibraryoverlay.empty", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"13":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                                "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1)) != null ? stack1.createAList : stack1), depth0))
    + "\r\n";
},"15":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                                "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.createAList", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"17":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1)) != null ? stack1.enternewlist : stack1), depth0))
    + "\r\n";
},"19":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.movetolibraryoverlay.enternewlist", {"name":"i18n","hash":{},"data":data})))
    + "   \r\n";
},"21":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1)) != null ? stack1.createsuccessdescription : stack1), depth0))
    + "\r\n";
},"23":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.createsuccessdescription", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"25":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1)) != null ? stack1.save : stack1), depth0))
    + "\r\n";
},"27":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.save", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"29":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1)) != null ? stack1.cancel : stack1), depth0))
    + "\r\n";
},"31":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.cancel", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"33":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1)) != null ? stack1.close : stack1), depth0))
    + "\r\n";
},"35":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.close", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"overlay-header\" role=\"header\">\r\n    <h4 class=\"heading\" id=\"myModalLabel\">        \r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </h4>\r\n    <hr class=\"divider\"/>\r\n</div>\r\n<div class=\"overlay-content\" role=\"main\">\r\n    <div class=\"overlay-content-inner\">\r\n        <div class=\"new-list-controls\">\r\n            <form action=\"\" aria-hidden=\"true\" class=\"form-createlist\" role=\"form\">\r\n                <div class=\"form-group\">\r\n                    <span class=\"error mobile-only\" id=\"inputerror\" aria-hidden=\"true\">\r\n                        <span class=\"listnameexists\">        \r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.program(7, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                        </span>\r\n                        <span class=\"empty\">      \r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.program(11, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                        </span>\r\n                    </span>\r\n                    <label class=\"sr-only\" for=\"newlistoverlayinput\">        \r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1), {"name":"if","hash":{},"fn":this.program(13, data),"inverse":this.program(15, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                    </label>\r\n                    <input class=\"\" maxlength=\"35\" id=\"newlistoverlayinput\" placeholder=\"\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1), {"name":"if","hash":{},"fn":this.program(17, data),"inverse":this.program(19, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                    \" type=\"text\" aria-labelledby=\"\">\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n    <div class=\"alert alert-success\" role=\"alert\">\r\n        <span class=\"icon-checkmark\"></span>       \r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1), {"name":"if","hash":{},"fn":this.program(21, data),"inverse":this.program(23, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </div>\r\n</div>\r\n<div class=\"overlay-footer\" role=\"footer\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-6 last-column col-md-push-6\">\r\n            <div class=\"savearticle-controls\">\r\n                <button class=\"btn btn-cta btn-default\" id=\"createlistoverlaybtn\" type=\"button\">\r\n                    <span class=\"icon-chevron-right\"></span>     \r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1), {"name":"if","hash":{},"fn":this.program(25, data),"inverse":this.program(27, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                    \r\n                </button>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-6 col-md-pull-6\">\r\n            <div class=\"savearticle-controls\">\r\n                <a class=\"btn-cta btn-cancel cancel\" href=\"#\" id=\"cancelaction\" data-dismiss=\"modal\">\r\n                    <span class=\"icon-close\"></span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1), {"name":"if","hash":{},"fn":this.program(29, data),"inverse":this.program(31, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                </a>\r\n                <button class=\"btn-cta btn-default close\" href=\"#\" data-dismiss=\"modal\">\r\n                    <span class=\"icon-close\"></span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1), {"name":"if","hash":{},"fn":this.program(33, data),"inverse":this.program(35, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                    \r\n                </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});



this["Handlebars"]["templates"]["template-deletelist"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.deletelist : stack1)) != null ? stack1.deleteThisList : stack1), depth0))
    + "\r\n";
},"3":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.deleteThisList", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.deletelist : stack1)) != null ? stack1.deleteThisListDescription : stack1), depth0))
    + "\r\n";
},"7":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.deleteThisListDescription", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"9":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.deletelist : stack1)) != null ? stack1.successDescription : stack1), depth0))
    + "\r\n";
},"11":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.successDescription", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"13":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.deletelist : stack1)) != null ? stack1.deleteIt : stack1), depth0))
    + "\r\n";
},"15":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.deleteIt", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"17":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.deletelist : stack1)) != null ? stack1.keepIt : stack1), depth0))
    + "\r\n";
},"19":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.keepIt", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"21":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.deletelist : stack1)) != null ? stack1.close : stack1), depth0))
    + "\r\n";
},"23":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.close", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"overlay-header\" role=\"header\">\r\n    <h4 class=\"heading\" id=\"myModalLabel\">        \r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.deletelist : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "            </h4>\r\n    <hr class=\"divider\"/>\r\n</div>\r\n<div class=\"overlay-content\" role=\"main\">\r\n    <div class=\"overlay-content-inner\">\r\n         <p class=\"description\" id=\"description\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.deletelist : stack1), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.program(7, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        </p>\r\n        <div class=\"alert alert-info alert-filled libraryname\" role=\"alert\"></div>\r\n    </div>\r\n    <div class=\"alert alert-success\" role=\"alert\">\r\n        <span class=\"icon-checkmark\"></span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.deletelist : stack1), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.program(11, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </div>\r\n</div>\r\n<div class=\"overlay-footer\" role=\"footer\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-6 last-column col-md-push-6\">\r\n            <div class=\"savearticle-controls\">\r\n                <button class=\"btn btn-cta btn-default trackable\" id=\"deletelistbtn\" type=\"button\">\r\n                    <span class=\"icon-chevron-right\"></span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.deletelist : stack1), {"name":"if","hash":{},"fn":this.program(13, data),"inverse":this.program(15, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                </button>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-6 col-md-pull-6\">\r\n            <div class=\"savearticle-controls\">\r\n                <a class=\"btn-cta btn-cancel cancel\" href=\"#\" id=\"cancelaction\" data-dismiss=\"modal\">\r\n                    <span class=\"icon-close\"></span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.deletelist : stack1), {"name":"if","hash":{},"fn":this.program(17, data),"inverse":this.program(19, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                </a>\r\n                <button class=\"btn-cta btn-default close\" href=\"#\"  data-dismiss=\"modal\">\r\n                    <span class=\"icon-close\"></span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.deletelist : stack1), {"name":"if","hash":{},"fn":this.program(21, data),"inverse":this.program(23, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});



this["Handlebars"]["templates"]["template-editlist"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1)) != null ? stack1.thatNameIsTaken : stack1), depth0))
    + "\r\n";
},"3":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.thatNameIsTaken", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1)) != null ? stack1.empty : stack1), depth0))
    + "\r\n";
},"7":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.addtolibraryoverlay.empty", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"9":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1)) != null ? stack1.createAList : stack1), depth0))
    + "\r\n";
},"11":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                    "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.createAList", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"13":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1)) != null ? stack1.cancel : stack1), depth0))
    + "\r\n";
},"15":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                    "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.cancel", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"17":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1)) != null ? stack1.save : stack1), depth0))
    + "\r\n";
},"19":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                    "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.save", {"name":"i18n","hash":{},"data":data})))
    + "\r\n                ";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"edit-list-controls is-editing\">\r\n    <form action=\"\" aria-hidden=\"true\" class=\"form-editlist\" role=\"form\">\r\n        <div class=\"form-group\">\r\n            <span class=\"error mobile-only inputerror\" aria-hidden=\"true\">\r\n                <span class=\"listnameexists\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                </span>\r\n                <span class=\"empty\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.program(7, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                </span>\r\n            </span>\r\n            <label class=\"sr-only\" for=\"editlistinput\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.program(11, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "            </label>\r\n            <input class=\"editlistinput\" maxlength=\"35\" placeholder=\"Rename list\" type=\"text\" aria-labelledby=\"\">\r\n        </div>\r\n        <div class=\"row librarylist-controls\">\r\n            <div class=\"col-xs-6 full-bleed\">\r\n                <a class=\"btn-cta btn-cancel canceleditbtn\" href=\"#\" tabindex=\"0\" type=\"cancel\"><span class=\"icon-close\"></span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1), {"name":"if","hash":{},"fn":this.program(13, data),"inverse":this.program(15, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                </a>\r\n            </div>\r\n            <div class=\"col-xs-6 full-bleed\">\r\n                <a class=\"btn-cta editlistbtn\" href=#\"\" tabindex=\"0\" type=\"submit\"><span class=\"icon-chevron-right\"></span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1), {"name":"if","hash":{},"fn":this.program(17, data),"inverse":this.program(19, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </a>\r\n            </div>\r\n        </div>\r\n    </form>\r\n</div>";
},"useData":true});



this["Handlebars"]["templates"]["template-editlistoverlay"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.editlist : stack1)) != null ? stack1.editYourListName : stack1), depth0))
    + "\r\n";
},"3":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.editYourListName", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                                "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1)) != null ? stack1.thatNameIsTaken : stack1), depth0))
    + "\r\n";
},"7":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                                "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.thatNameIsTaken", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"9":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                                "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1)) != null ? stack1.empty : stack1), depth0))
    + "\r\n";
},"11":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                                "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.addtolibraryoverlay.empty", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"13":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                            "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1)) != null ? stack1.createAList : stack1), depth0))
    + "\r\n";
},"15":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                            "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.createAList", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"17":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.editlist : stack1)) != null ? stack1.editsuccessdescriptionmobile : stack1), depth0))
    + "\r\n";
},"19":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.editsuccessdescriptionmobile", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"21":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1)) != null ? stack1.save : stack1), depth0))
    + "\r\n";
},"23":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.save", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"25":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1)) != null ? stack1.cancel : stack1), depth0))
    + "\r\n";
},"27":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.cancel", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"29":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1)) != null ? stack1.close : stack1), depth0))
    + "\r\n";
},"31":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.close", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"overlay-header\" role=\"header\">\r\n    <h4 class=\"heading\" id=\"myModalLabel\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.editlist : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        </h4>\r\n    <hr class=\"divider\"/>\r\n</div>\r\n<div class=\"overlay-content\" role=\"main\">\r\n    <div class=\"overlay-content-inner\">\r\n        <div class=\"edit-list-controls is-editing\">\r\n            <form action=\"\" aria-hidden=\"true\" class=\"form-editlist\" role=\"form\">\r\n                <div class=\"form-group\">\r\n                    <span class=\"error mobile-only inputerror\" aria-hidden=\"true\">\r\n                        <span class=\"listnameexists\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.program(7, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                        </span>\r\n                        <span class=\"empty\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.program(11, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                        </span>\r\n                    </span>\r\n                    <label class=\"sr-only\" for=\"editlistoverlayinput\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1), {"name":"if","hash":{},"fn":this.program(13, data),"inverse":this.program(15, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                    </label>\r\n                    <input id=\"editlistoverlayinput\" maxlength=\"35\"  placeholder=\"Rename list\" type=\"text\" aria-labelledby=\"\">\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n    <div class=\"alert alert-success\" role=\"alert\">\r\n        <span class=\"icon-checkmark\"></span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.editlist : stack1), {"name":"if","hash":{},"fn":this.program(17, data),"inverse":this.program(19, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        \r\n    </div>\r\n</div>\r\n<div class=\"overlay-footer\" role=\"footer\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-6 last-column col-md-push-6\">\r\n            <div class=\"savearticle-controls\">\r\n                <button class=\"btn btn-cta btn-default\" id=\"editlistoverlaybtn\" type=\"button\">\r\n                    <span class=\"icon-chevron-right\"></span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1), {"name":"if","hash":{},"fn":this.program(21, data),"inverse":this.program(23, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                </button>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-6 col-md-pull-6\">\r\n            <div class=\"savearticle-controls\">\r\n                <a class=\"btn-cta btn-cancel cancel\" href=\"#\" id=\"cancelaction\" data-dismiss=\"modal\">\r\n                    <span class=\"icon-close\"></span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1), {"name":"if","hash":{},"fn":this.program(25, data),"inverse":this.program(27, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                </a>\r\n                <button class=\"btn-cta btn-default close\" href=\"#\"  data-dismiss=\"modal\">\r\n                    <span class=\"icon-close\"></span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1), {"name":"if","hash":{},"fn":this.program(29, data),"inverse":this.program(31, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                    \r\n                </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});



this["Handlebars"]["templates"]["template-editsuccess"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.editlist : stack1)) != null ? stack1.namechanges : stack1), depth0))
    + "\r\n";
},"3":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.librarylist.namechanges", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.editlist : stack1)) != null ? stack1.listnamechanged : stack1), depth0))
    + "\r\n";
},"7":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.librarylist.listnamechanged", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"9":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                            "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1)) != null ? stack1.close : stack1), depth0))
    + "\r\n";
},"11":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                            "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.close", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"modal-content editsuccessmodal\">\r\n    <div class=\"overlay-header\" role=\"header\">\r\n        <h4 class=\"heading\" id=\"myModalLabel\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.editlist : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        </h4>\r\n        <hr class=\"divider\">\r\n    </div>\r\n    <div class=\"overlay-content\" role=\"main\">\r\n        <div class=\"alert alert-success editsuccesssingle\" role=\"alert\">\r\n            <span class=\"icon-checkmark\"></span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.editlist : stack1), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.program(7, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        </div>\r\n    </div>\r\n    <div class=\"overlay-footer\" role=\"footer\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n                <div class=\"savearticle-controls\">\r\n                    <button class=\"btn-cta btn-default close editsucessdismis\" href=\"#\" data-dismiss=\"modal\">\r\n                        <span class=\"icon-close\"></span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.program(11, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                    </button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});



this["Handlebars"]["templates"]["template-sharelist"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.sharelist : stack1)) != null ? stack1.shareThisList : stack1), depth0))
    + "\r\n";
},"3":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.shareThisList", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.sharelist : stack1)) != null ? stack1.shareThisListDescription : stack1), depth0))
    + "\r\n";
},"7":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.shareThisListDescription", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"9":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.sharelist : stack1)) != null ? stack1.copySuccessDescription : stack1), depth0))
    + "\r\n";
},"11":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.copySuccessDescription", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"13":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.sharelist : stack1)) != null ? stack1.copyFailedClipboardAccessDenied : stack1), depth0))
    + "\r\n";
},"15":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.copyFailedClipboardAccessDenied", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"17":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.sharelist : stack1)) != null ? stack1.listmanagementcopy : stack1), depth0))
    + "\r\n";
},"19":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.copy", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"21":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1)) != null ? stack1.cancel : stack1), depth0))
    + "\r\n";
},"23":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.cancel", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"25":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1)) != null ? stack1.close : stack1), depth0))
    + "\r\n";
},"27":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                        "
    + escapeExpression(((helpers.i18n || (depth0 && depth0.i18n) || helperMissing).call(depth0, "kpmg.personalization.library.listmanagement.close", {"name":"i18n","hash":{},"data":data})))
    + "\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"overlay-header\" role=\"header\">\r\n    <h4 class=\"heading\" id=\"myModalLabel\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.sharelist : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        \r\n    </h4>\r\n    <hr class=\"divider\"/>\r\n</div>\r\n<div class=\"overlay-content\" role=\"main\">\r\n    <div class=\"overlay-content-inner\">\r\n        <p class=\"description\" id=\"description\">\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.sharelist : stack1), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.program(7, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        </p>\r\n        <input class=\"alert alert-info\" type=\"text\" id=\"clipboardinput\" value=\"\"/>\r\n    </div>\r\n    <div class=\"alert alert-success\" role=\"alert\">\r\n        <span class=\"icon-checkmark\"></span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.sharelist : stack1), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.program(11, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </div>\r\n    <div class=\"alert alert-failure\" role=\"alert\">\r\n        <span class=\"icon-close\"></span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.sharelist : stack1), {"name":"if","hash":{},"fn":this.program(13, data),"inverse":this.program(15, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        \r\n    </div>\r\n</div>\r\n<div class=\"overlay-footer\" role=\"footer\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-6 last-column col-md-push-6\">\r\n            <div class=\"savearticle-controls\">\r\n                <button class=\"btn btn-cta btn-default\" id=\"copytocb\" type=\"button\">\r\n                    <span class=\"icon-chevron-right\"></span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.sharelist : stack1), {"name":"if","hash":{},"fn":this.program(17, data),"inverse":this.program(19, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                    \r\n                </button>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-6 col-md-pull-6\">\r\n            <div class=\"savearticle-controls\">\r\n                <a class=\"btn-cta btn-cancel cancel\" href=\"#\" id=\"cancelaction\" data-dismiss=\"modal\">\r\n                    <span class=\"icon-close\"></span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1), {"name":"if","hash":{},"fn":this.program(21, data),"inverse":this.program(23, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                </a>\r\n                <button class=\"btn-cta close btn-default\" href=\"#\" data-dismiss=\"modal\">\r\n                    <span class=\"icon-close\"></span>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.hbs : depth0)) != null ? stack1.createlistoverlay : stack1), {"name":"if","hash":{},"fn":this.program(25, data),"inverse":this.program(27, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});

return this["Handlebars"]["templates"];

});