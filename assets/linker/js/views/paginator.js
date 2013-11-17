window.Paginator = Backbone.View.extend({

    tagName: "ul",
    className: "pagination .pagination-sm",

    initialize:function (options) {
        this.model.bind("reset", this.render, this);
        this.page = options.page;
        //this.render();
        
    },

    render:function () {

       

        var items = this.model.models;
        var len = items.length;
        var pageCount = Math.ceil(len / 20);

        //$(this.el).html('<ul />');


        for (var i=0; i < pageCount; i++) {
            $(this.el).append("<li" + ((i + 1) === this.page ? " class='active'" : "") + "><a href='#opps/page/"+(i+1)+"'>" + (i+1) + "</a></li>");
        }
        return this;
    }
});