(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0b09a0ec"],{1299:function(t,s,e){},"42eb":function(t,s,e){"use strict";var a=e("f052"),i=e.n(a);i.a},4580:function(t,s,e){},4636:function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("combobox",{attrs:{label:t.label,disabled:t.disabled,options:t.booleanOptions,value:t.value},on:{input:t.emitValue,enter:t.emitEnter}})},i=[],o=e("992f"),n={name:"combobox-boolean",components:{Combobox:o["a"]},props:{label:{default:"",type:String},value:{default:"false",type:String},options:{default:function(){return[]},type:Array},disabled:{default:!1,type:Boolean}},data:function(){return{booleanOptions:[{label:this.$t("main.yes"),value:"true"},{label:this.$t("main.no"),value:"false"}]}},computed:{},methods:{emitValue:function(t){this.$emit("input",t)},emitEnter:function(t){this.$emit("enter",t)}}},l=n,r=e("2877"),c=Object(r["a"])(l,a,i,!1,null,"5da9e2c2",null);s["a"]=c.exports},"9f1e":function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"task-status page fixed-page"},[e("div",{staticClass:"level page-header"},[e("div",{staticClass:"level-left"},[e("page-title",{attrs:{text:t.$t("task_status.title")}})],1),e("div",{staticClass:"level-right"},[e("div",{staticClass:"level-item"},[e("button-link",{staticClass:"level-item task-status-new",attrs:{icon:"plus",text:t.$t("task_status.new_task_status"),path:"/task-status/new"}})],1)])]),e("task-status-list",{attrs:{entries:t.taskStatus,"is-loading":t.taskStatusList.isLoading,"is-error":t.taskStatusList.isError}}),e("edit-task-status-modal",{attrs:{active:t.modals.isNewDisplayed,"is-loading":t.editStatus.isLoading,"is-error":t.editStatus.isError,"cancel-route":"/task-status","task-status-to-edit":t.taskStatusToEdit},on:{confirm:t.confirmEditTaskStatus}}),e("delete-modal",{attrs:{active:t.modals.isDeleteDisplayed,"is-loading":t.deleteStatus.isLoading,"is-error":t.deleteStatus.isError,"cancel-route":"/task-status",text:t.deleteText(),"error-text":t.$t("task_status.delete_error")},on:{confirm:t.confirmDeleteTaskStatus}})],1)},i=[],o=(e("7f7f"),e("cebc")),n=e("2f62"),l=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"data-list"},[e("div",{staticStyle:{overflow:"hidden"}},[e("table",{ref:"headerWrapper",staticClass:"table table-header"},[e("thead",[e("tr",[e("th",{staticClass:"name"},[t._v("\n            "+t._s(t.$t("task_status.fields.name"))+"\n          ")]),e("th",{staticClass:"short-name"},[t._v("\n            "+t._s(t.$t("task_status.fields.short_name"))+"\n          ")]),e("th",{staticClass:"is-done"},[t._v("\n            "+t._s(t.$t("task_status.fields.is_done"))+"\n          ")]),e("th",{staticClass:"is-retake"},[t._v("\n            "+t._s(t.$t("task_status.fields.is_retake"))+"\n          ")]),e("th",{staticClass:"is-artist-allowed"},[t._v("\n            "+t._s(t.$t("task_status.fields.is_artist_allowed"))+"\n          ")]),e("th",{staticClass:"actions"})])])])]),e("table-info",{attrs:{"is-loading":t.isLoading,"is-error":t.isError}}),e("div",{directives:[{name:"scroll",rawName:"v-scroll",value:t.onBodyScroll,expression:"onBodyScroll"}],staticClass:"table-body"},[e("table",{staticClass:"table"},[e("tbody",t._l(t.entries,function(s){return e("tr",{key:s.id},[e("td",{staticClass:"name"},[t._v("\n            "+t._s(s.name)+"\n          ")]),e("task-status-name",{staticClass:"short-name",attrs:{entry:s}}),e("td",{staticClass:"is-done"},[t._v("\n            "+t._s(t.formatBoolean(s.is_done))+"\n          ")]),e("td",{staticClass:"is-retake"},[t._v("\n            "+t._s(t.formatBoolean(s.is_retake))+"\n          ")]),e("td",{staticClass:"is-artist-allowed"},[t._v("\n            "+t._s(t.formatBoolean(s.is_artist_allowed))+"\n          ")]),e("row-actions",{attrs:{"entry-id":s.id,"edit-route":{name:"edit-task-status",params:{task_status_id:s.id}},"delete-route":{name:"delete-task-status",params:{task_status_id:s.id}},"hide-edit":"todo"===s.short_name,"hide-delete":"todo"===s.short_name}})],1)}),0)])]),e("p",{staticClass:"has-text-centered nb-task-status"},[t._v("\n    "+t._s(t.entries.length)+" "+t._s(t.$tc("task_status.number",t.entries.length))+"\n  ")])],1)},r=[],c=e("4f18"),u=e("03b1"),d=e("e60b"),f=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("td",{staticClass:"name"},[e("div",{staticClass:"tag",style:{background:t.color,color:t.textColor}},[t._v("\n    "+t._s(t.entry.short_name)+"\n  ")])])},m=[],h={name:"task-status-name",components:{},props:["entry"],computed:Object(o["a"])({},Object(n["c"])(["isDarkTheme"]),{color:function(){return"todo"===this.entry.short_name&&this.isDarkTheme?"#5F626A":this.entry.color},textColor:function(){return"todo"!==this.entry.short_name||this.isDarkTheme?"white":"#333"}}),methods:Object(o["a"])({},Object(n["b"])([]))},k=h,_=(e("f2a2"),e("2877")),b=Object(_["a"])(k,f,m,!1,null,"42a13a88",null),p=b.exports,v={name:"task-status-list",mixins:[c["a"]],props:["entries","isLoading","isError"],data:function(){return{}},components:{RowActions:u["a"],TableInfo:d["a"],TaskStatusName:p},computed:Object(o["a"])({},Object(n["c"])([])),methods:Object(o["a"])({},Object(n["b"])([]),{onBodyScroll:function(t,s){this.$refs.headerWrapper.style.left="-".concat(s.scrollLeft,"px")}})},S=v,C=(e("42eb"),Object(_["a"])(S,l,r,!1,null,"3fca01f8",null)),$=C.exports,g=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{class:{modal:!0,"is-active":t.active}},[e("div",{staticClass:"modal-background"}),e("div",{staticClass:"modal-content"},[e("div",{staticClass:"box"},[t.isEditing()?e("h1",{staticClass:"title"},[t._v("\n        "+t._s(t.$t("task_status.edit_title"))+" "+t._s(t.taskStatusToEdit.name)+"\n      ")]):e("h1",{staticClass:"title"},[t._v("\n        "+t._s(t.$t("task_status.new_task_status"))+"\n      ")]),e("form",{on:{submit:function(t){t.preventDefault()}}},[e("text-field",{directives:[{name:"focus",rawName:"v-focus"}],ref:"nameField",attrs:{"input-class":"task-status-name",label:t.$t("task_status.fields.name")},model:{value:t.form.name,callback:function(s){t.$set(t.form,"name",s)},expression:"form.name"}}),e("text-field",{directives:[{name:"focus",rawName:"v-focus"}],ref:"shortNameField",attrs:{"input-class":"task-status-short-name",label:t.$t("task_status.fields.short_name")},model:{value:t.form.short_name,callback:function(s){t.$set(t.form,"short_name",s)},expression:"form.short_name"}}),e("combobox-boolean",{attrs:{label:t.$t("task_status.fields.is_done")},model:{value:t.form.is_done,callback:function(s){t.$set(t.form,"is_done",s)},expression:"form.is_done"}}),e("combobox-boolean",{attrs:{label:t.$t("task_status.fields.is_retake")},model:{value:t.form.is_retake,callback:function(s){t.$set(t.form,"is_retake",s)},expression:"form.is_retake"}}),e("combobox-boolean",{attrs:{label:t.$t("task_status.fields.is_artist_allowed")},model:{value:t.form.is_artist_allowed,callback:function(s){t.$set(t.form,"is_artist_allowed",s)},expression:"form.is_artist_allowed"}}),e("color-field",{ref:"colorField",attrs:{label:t.$t("task_status.fields.color"),colors:t.colors},model:{value:t.form.color,callback:function(s){t.$set(t.form,"color",s)},expression:"form.color"}})],1),e("p",{staticClass:"has-text-right"},[e("a",{class:{button:!0,"confirm-edit-task-status":!0,"is-primary":!0,"is-loading":t.isLoading},on:{click:t.confirmClicked}},[t._v("\n          "+t._s(t.$t("main.confirmation"))+"\n        ")]),e("router-link",{staticClass:"button is-link",attrs:{to:t.cancelRoute}},[t._v("\n          "+t._s(t.$t("main.cancel"))+"\n        ")])],1)])])])},E=[],y=e("7bf8"),x=e("4636"),T=e("f865"),w={name:"edit-task-status-modal",components:{ComboboxBoolean:x["a"],TextField:y["a"],ColorField:T["a"]},props:["onConfirmClicked","text","active","cancelRoute","isLoading","isError","errorText","taskStatusToEdit"],data:function(){return{form:{name:"",short_name:"",color:"$grey999",is_reviewable:"true",is_done:"false"},isRetakeOptions:[{label:this.$t("main.yes"),value:"true"},{label:this.$t("main.no"),value:"false"}],isDoneOptions:[{label:this.$t("main.yes"),value:"true"},{label:this.$t("main.no"),value:"false"}],isArtistAllowedOptions:[{label:this.$t("main.yes"),value:"true"},{label:this.$t("main.no"),value:"false"}],colors:["#000000","#E81123","#ff3860","#FF5722","#FFA000","#AFB42B","#22d160","#43A047","#498205","#607D8B","#3273dc","#8764B8","#ab26ff"]}},computed:Object(o["a"])({},Object(n["c"])(["taskStatus","taskStatusStatusOptions"])),methods:Object(o["a"])({},Object(n["b"])([]),{confirmClicked:function(){this.$emit("confirm",this.form)},isEditing:function(){return this.taskStatusToEdit&&this.taskStatusToEdit.id},resetForm:function(){this.taskStatusToEdit&&(this.form={name:this.taskStatusToEdit.name,short_name:this.taskStatusToEdit.short_name,color:this.taskStatusToEdit.color,is_reviewable:String(this.taskStatusToEdit.is_reviewable),is_done:String(this.taskStatusToEdit.is_done),is_retake:String(this.taskStatusToEdit.is_retake||!1),is_artist_allowed:String(this.taskStatusToEdit.is_artist_allowed)})}}),watch:{taskStatusToEdit:function(){this.resetForm()},active:function(){var t=this;this.active&&(this.resetForm(),setTimeout(function(){t.$refs.nameField.focus()},100))}}},O=w,D=(e("e89b"),Object(_["a"])(O,g,E,!1,null,"ca51336a",null)),j=D.exports,B=e("8d07"),F=e("5f48"),L=e("e211"),A={name:"task-status",components:{ButtonLink:L["a"],DeleteModal:F["a"],EditTaskStatusModal:j,PageTitle:B["a"],TaskStatusList:$},data:function(){return{taskStatusToDelete:null,taskStatusToEdit:null,modals:{isNewDisplayed:!1,isDeleteDisplayed:!1},taskStatusList:{isLoading:!1,isError:!1},editStatus:{isLoading:!1,isError:!1},deleteStatus:{isLoading:!1,isError:!1}}},computed:Object(o["a"])({},Object(n["c"])(["taskStatus","taskStatusMap"])),created:function(){this.handleModalsDisplay()},methods:Object(o["a"])({},Object(n["b"])(["deleteTaskStatus"]),{confirmEditTaskStatus:function(t){var s=this,e=!(this.taskStatusToEdit&&this.taskStatusToEdit.id),a="newTaskStatus";e||(a="saveTaskStatus",t.id=this.taskStatusToEdit.id),this.editStatus.isLoading=!0,this.editStatus.isError=!1,this.$store.dispatch(a,{form:t,callback:function(t){s.editStatus.isLoading=!1,t?s.editStatus.isError=!0:s.$router.push({name:"task-status"})}})},confirmDeleteTaskStatus:function(){var t=this;this.deleteStatus.isLoading=!0,this.deleteStatus.isError=!1,this.deleteTaskStatus({taskStatus:this.taskStatusToDelete,callback:function(s){t.deleteStatus.isLoading=!1,s?t.deleteStatus.isError=!0:t.$router.push({name:"task-status"})}})},deleteText:function(){var t=this.taskStatusToDelete;return t?this.$t("task_status.delete_text",{name:t.name}):""},handleModalsDisplay:function(){var t=this.$store.state.route.path,s=this.$store.state.route.params.task_status_id;t.indexOf("new")>0?(this.taskStatusToEdit={color:"#000000"},this.modals.isNewDisplayed=!0):t.indexOf("edit")>0?(this.taskStatusToEdit=this.taskStatusMap[s],this.modals.isNewDisplayed=!0):t.indexOf("delete")>0?(this.taskStatusToDelete=this.taskStatusMap[s],this.modals.isDeleteDisplayed=!0):(this.modals.isNewDisplayed=!1,this.modals.isDeleteDisplayed=!1)}}),watch:{$route:function(){this.handleModalsDisplay()}},metaInfo:function(){return{title:"".concat(this.$t("task_status.title")," - Kitsu")}}},N=A,M=Object(_["a"])(N,a,i,!1,null,"04787091",null);s["default"]=M.exports},b196:function(t,s,e){},e89b:function(t,s,e){"use strict";var a=e("4580"),i=e.n(a);i.a},edc6:function(t,s,e){"use strict";var a=e("1299"),i=e.n(a);i.a},f052:function(t,s,e){},f2a2:function(t,s,e){"use strict";var a=e("b196"),i=e.n(a);i.a},f865:function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"field"},[e("label",{staticClass:"label"},[t._v(t._s(t.label))]),e("div",{staticClass:"control colors"},t._l(t.colors,function(s,a){return e("div",{key:"color-"+a,ref:"color-"+a,refInFor:!0,class:{color:!0,selected:t.value===s},on:{click:function(e){return t.colorChanged(s)}}},[e("span",{style:{background:s}})])}),0)])},i=[],o=e("cebc"),n=e("2f62"),l={name:"text-field",props:{label:{default:"",type:String},value:{default:"$grey999",type:String},placeholder:{default:"",type:String},type:{default:"text",type:String},colors:{default:function(){return["#999999","#8D6E63","#43A047","#7CB342","#009688","#9CCC65","#AFB42B","#F9A825","#F57C00","#ff5252","#F06292","#AB47BC","#5C6BC0","#039BE5","#26C6DA","#64B5F6","#78909C"]}}},data:function(){return{selectedColor:"$grey999"}},computed:Object(o["a"])({},Object(n["c"])([])),methods:Object(o["a"])({},Object(n["b"])([]),{colorChanged:function(t,s){this.$emit("input",t)}})},r=l,c=(e("edc6"),e("2877")),u=Object(c["a"])(r,a,i,!1,null,"69fc363c",null);s["a"]=u.exports}}]);
//# sourceMappingURL=chunk-0b09a0ec.2bf3756d.js.map