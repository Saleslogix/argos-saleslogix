define('crm/Views/RelatedEditWidget', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/event', 'dojo/on', 'dojo/dom-construct', 'dojo/_base/connect', 'dojo/_base/array', 'argos/RelatedViewManager', 'argos/_RelatedViewWidgetBase', 'argos/Edit'], function (exports, module, _dojo_baseDeclare, _dojo_baseEvent, _dojoOn, _dojoDomConstruct, _dojo_baseConnect, _dojo_baseArray, _argosRelatedViewManager, _argos_RelatedViewWidgetBase, _argosEdit) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _event = _interopRequireDefault(_dojo_baseEvent);

  var _on = _interopRequireDefault(_dojoOn);

  var _domConstruct = _interopRequireDefault(_dojoDomConstruct);

  var _connect = _interopRequireDefault(_dojo_baseConnect);

  var _array = _interopRequireDefault(_dojo_baseArray);

  var _RelatedViewManager = _interopRequireDefault(_argosRelatedViewManager);

  var _RelatedViewWidgetBase2 = _interopRequireDefault(_argos_RelatedViewWidgetBase);

  var _Edit = _interopRequireDefault(_argosEdit);

  var __class = (0, _declare['default'])('crm.Views.RelatedEditWidget', [_RelatedViewWidgetBase2['default']], {
    cls: 'related-edit-widget',
    owner: null,
    id: 'related-edit-widget',
    editView: null,
    toolBarTemplate: new Simplate(['<div class="toolBar">', '<button class="button toolButton toolButton-right  fa fa-save fa-fw fa-lg" data-action="save"></button>', '<div>']),
    onLoad: function onLoad() {
      this.processEntry(this.parentEntry);
    },
    processEntry: function processEntry(entry) {
      var Ctor = this.editView ? this.editView : _Edit['default'];
      var editView = new Ctor({
        id: this.id + '_edit'
      });
      if (editView && !editView._started) {
        editView.sectionBeginTemplate = new Simplate(['<fieldset class="{%= ($.cls || $.options.cls) %}">']);
        editView.init();
        editView._started = true;
        editView.onUpdateCompleted = this.onUpdateCompleted.bind(this);
      }
      // Add the toolbar for save
      var toolBarNode = _domConstruct['default'].toDom(this.toolBarTemplate.apply(entry, this));
      (0, _on['default'])(toolBarNode, 'click', this.onInvokeToolBarAction.bind(this));
      _domConstruct['default'].place(toolBarNode, this.containerNode, 'last');

      // Add the edit view to view
      editView.placeAt(this.containerNode, 'last');

      var options = {
        select: this.getEditSelect(),
        key: entry.$key
      };
      editView.options = options;
      editView.activate();
      editView.requestData();
      this.editViewInstance = editView;
    },
    onInvokeToolBarAction: function onInvokeToolBarAction(evt) {
      this.editViewInstance.save();
      _event['default'].stop(evt);
    },
    getEditLayout: function getEditLayout() {
      var editLayout = [];
      if (this.layout) {
        this.layout.forEach(function forEach(item) {
          if (!item.readonly) {
            editLayout.push(item);
          }
        });
      }
      return editLayout;
    },
    getEditSelect: function getEditSelect() {
      var select = null;
      if (this.formModel) {
        select = this.formModel.getEditSelect();
      }
      return select;
    },
    onUpdateCompleted: function onUpdateCompleted() {
      if (this.owner && this.owner._refreshClicked) {
        this.owner._refreshClicked();
      }
      this.inherited(arguments);
    },
    destroy: function destroy() {
      _array['default'].forEach(this._subscribes, function forEach(handle) {
        _connect['default'].unsubscribe(handle);
      });

      if (this.editViewInstance) {
        for (var _name in this.editViewInstance.fields) {
          if (this.editViewInstance.fields.hasOwnProperty(_name)) {
            this.editViewInstance.fields[_name].destroy();
          }
        }
        this.editViewInstance.destroy();
      }
      this.inherited(arguments);
    }
  });
  var rvm = new _RelatedViewManager['default']();
  rvm.registerType('relatedEdit', __class);
  module.exports = __class;
});
