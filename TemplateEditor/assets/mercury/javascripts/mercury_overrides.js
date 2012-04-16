jQuery(window).bind('mercury:ready', function() {
    Mercury.saveUrl = jQuery("meta[name=saveurl]").attr("content");

    Mercury.modalHandlers.addTemplateField = function() {
        var bookmarkSelect, container, existingLink, href, link, newBookmarkInput, selection, _i, _len, _ref,
      _this = this;

        if (Mercury.region && Mercury.region.selection) {
            selection = Mercury.region.selection();

            Mercury.log('field selection', selection);

            if (selection && selection.commonAncestor) {
                container = selection.commonAncestor(true).closest('a');

            }
            if (container && container.length) {

                existingLink = container;
                this.element.find('#link_text_container').hide();
                if (container.attr('href') && container.attr('href').indexOf('#') === 0) {
                    bookmarkSelect.val(container.attr('href').replace(/[^#]*#/, ''));
                    bookmarkSelect.prev('label').find('input[type=radio]').prop("checked", true);
                } else {
                    this.element.find('#link_external_url').val(container.attr('href'));
                }
            }

            if (selection.textContent) {
                this.element.find('#link_text').val(selection.textContent());
            }
        }


    };

    //    Mercury.modalHandlers.insertLink = function() {
    //    var bookmarkSelect, container, existingLink, href, link, newBookmarkInput, selection, _i, _len, _ref,
    //      _this = this;
    ////    this.element.find('label input').on('click', function() {
    ////      return jQuery(this).closest('label').next('.selectable').focus();
    ////    });
    ////    this.element.find('.selectable').on('focus', function() {
    ////      return jQuery(this).prev('label').find('input[type=radio]').prop("checked", true);
    ////    });
    ////    this.element.find('#link_target').on('change', function() {
    ////      _this.element.find(".link-target-options").hide();
    ////      _this.element.find("#" + (_this.element.find('#link_target').val()) + "_options").show();
    ////      return _this.resize(true);
    ////    });
    ////    bookmarkSelect = this.element.find('#link_existing_bookmark');
    ////    _ref = jQuery('a[name]', window.mercuryInstance.document);
    ////    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    ////      link = _ref[_i];
    ////      bookmarkSelect.append(jQuery('<option>', {
    ////        value: jQuery(link).attr('name')
    ////      }).text(jQuery(link).text()));
    ////    }
    //    if (Mercury.region && Mercury.region.selection) {
    //      selection = Mercury.region.selection();
    //      if (selection && selection.commonAncestor) {
    //        container = selection.commonAncestor(true).closest('a');
    //      }
    //      if (container && container.length) {
    //        existingLink = container;
    //        this.element.find('#link_text_container').hide();
    //        if (container.attr('href') && container.attr('href').indexOf('#') === 0) {
    //          bookmarkSelect.val(container.attr('href').replace(/[^#]*#/, ''));
    //          bookmarkSelect.prev('label').find('input[type=radio]').prop("checked", true);
    //        } else {
    //          this.element.find('#link_external_url').val(container.attr('href'));
    //        }
    //        if (container.attr('name')) {
    //          newBookmarkInput = this.element.find('#link_new_bookmark');
    //          newBookmarkInput.val(container.attr('name'));
    //          newBookmarkInput.prev('label').find('input[type=radio]').prop("checked", true);
    //        }
    //        if (container.attr('target')) {
    //          this.element.find('#link_target').val(container.attr('target'));
    //        }
    //        if (container.attr('href') && container.attr('href').indexOf('javascript:void') === 0) {
    //          href = container.attr('href');
    //          this.element.find('#link_external_url').val(href.match(/window.open\('([^']+)',/)[1]);
    //          this.element.find('#link_target').val('popup');
    //          this.element.find('#link_popup_width').val(href.match(/width=(\d+),/)[1]);
    //          this.element.find('#link_popup_height').val(href.match(/height=(\d+),/)[1]);
    //          this.element.find('#popup_options').show();
    //        }
    //      }
    //      if (selection.textContent) {
    //        this.element.find('#link_text').val(selection.textContent());
    //      }
    //    }
    //    return this.element.find('form').on('submit', function(event) {
    //      var args, attrs, content, target, type, value;
    //      event.preventDefault();
    //      content = _this.element.find('#link_text').val();
    //      target = _this.element.find('#link_target').val();
    //      type = _this.element.find('input[name=link_type]:checked').val();
    //      switch (type) {
    //        case 'existing_bookmark':
    //          attrs = {
    //            href: "#" + (_this.element.find('#link_existing_bookmark').val())
    //          };
    //          break;
    //        case 'new_bookmark':
    //          attrs = {
    //            name: "" + (_this.element.find('#link_new_bookmark').val())
    //          };
    //          break;
    //        default:
    //          attrs = {
    //            href: _this.element.find("#link_" + type).val()
    //          };
    //      }
    //      switch (target) {
    //        case 'popup':
    //          args = {
    //            width: parseInt(_this.element.find('#link_popup_width').val()) || 500,
    //            height: parseInt(_this.element.find('#link_popup_height').val()) || 500,
    //            menubar: 'no',
    //            toolbar: 'no'
    //          };
    //          attrs['href'] = "javascript:void(window.open('" + attrs['href'] + "', 'popup_window', '" + (jQuery.param(args).replace(/&/g, ',')) + "'))";
    //          break;
    //        default:
    //          if (target) attrs['target'] = target;
    //      }
    //      value = {
    //        tagName: 'a',
    //        attrs: attrs,
    //        content: content
    //      };
    //      if (existingLink) {
    //        Mercury.trigger('action', {
    //          action: 'replaceLink',
    //          value: value,
    //          node: existingLink.get(0)
    //        });
    //      } else {
    //        Mercury.trigger('action', {
    //          action: 'insertLink',
    //          value: value
    //        });
    //      }
    //      return _this.hide();
    //    });
    //  };

    //}).call(this);

});

jQuery("#btnFilter").live("click", function() {
    Mercury.log('addField', "----------------------------->");
    var fieldsUrl = jQuery("meta[name=getFieldsUrl]").attr("content");

    //make ajax call and retrieve fields...
    
    //append fields to fieldset

});