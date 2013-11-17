window.AboutView = Backbone.View.extend({

    initialize:function () {
        this.render();
    },

    render:function () {
        $(this.el).html(_.template(JST['assets/linker/templates/tpl-header.html']()));
        return this;
    }

});