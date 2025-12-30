"use strict";
var PageCtrl;
(function (PageCtrl) {
    function home() {
        var about = PageCtrl.updateMenu();
        var title = {
            tagName: "h1",
            children: [{
                    tagName: "a",
                    props: {
                        href: "./fairy-tales/"
                    },
                    children: about === "关于" ? "童话故事" : "Fairy Tales"
                }]
        };
        var context = Hje.render(document.getElementById("blog_content"), {
            children: [title, {
                    tagName: "div",
                    children: DeepX.MdBlogs.getLocaleString("loading")
                }]
        });
        if (!context)
            return;
        DeepX.MdBlogs.generateMenuPromise("./fairy-tales/config.json", "docs", {
            styleRefs: "link-tile-compact",
            deep: 0,
            path: "./fairy-tales/"
        }).then(function (r) {
            context.model().children = [title, r];
            context.refresh();
        }, function (r) {
            context.model().children = [title, {
                    tagName: "div",
                    children: DeepX.MdBlogs.getLocaleString("loadFailed")
                }];
            context.refresh();
        });
    }
    PageCtrl.home = home;
})(PageCtrl || (PageCtrl = {}));
var PageCtrl;
(function (PageCtrl) {
    function stories() {
        DeepX.MdBlogs.render("blog_content", "./config.json", {
            title: true,
            onselect: function (ev) {
                var _a;
                if (!ev)
                    return;
                var article = ev.article;
                var model = ev.children;
                var localeOptions = ev.mkt == null ? undefined : { mkt: ev.mkt };
                if (!article || !model)
                    return;
                var books = formatBooks((_a = article.data) === null || _a === void 0 ? void 0 : _a.book, ev.defs("books"));
                var allAuthorsRefs = ev.defs("contributors");
                if (books.length > 0)
                    ev.insertChildren("end", {
                        tagName: "section",
                        styleRefs: "x-part-blog-related",
                        children: [{
                                tagName: "ul",
                                styleRefs: "x-part-article-books",
                                children: books.map(function (book) {
                                    var li = [{
                                            tagName: "span",
                                            children: DeepX.MdBlogs.getLocaleProp(book, null, localeOptions)
                                        }];
                                    if (book.year)
                                        li.push({
                                            tagName: "span",
                                            children: "(".concat(book.year.toString(), ")")
                                        });
                                    var authors = PageCtrl.getAuthors(book, allAuthorsRefs);
                                    if (authors.length > 0)
                                        li.push.apply(li, authors.map(function (author) {
                                            return { tagName: "span", children: DeepX.MdBlogs.getLocaleProp(author, null, localeOptions) };
                                        }));
                                    return {
                                        tagName: "li",
                                        children: li
                                    };
                                })
                            }]
                    });
            }
        });
        PageCtrl.updateMenu();
    }
    PageCtrl.stories = stories;
    function formatBooks(books, refs) {
        if (!books)
            return [];
        if (!(books instanceof Array))
            books = [books];
        if (!refs)
            return books;
        return books.map(function (book) {
            if (!book)
                return undefined;
            if (typeof book === "string") {
                return DeepX.MdBlogs.filterFirst(refs, function (item) {
                    return !!(item && item.name && item.year && book === "".concat(item.name, ", ").concat(item.year.toString(10)));
                });
            }
            return book.name && book.year ? book : undefined;
        }).filter(function (book) {
            return book;
        });
    }
})(PageCtrl || (PageCtrl = {}));
var PageCtrl;
(function (PageCtrl) {
    function updateMenu() {
        var about = DeepX.MdBlogs.setElementText("topmenu-about", "about");
        if (about !== "关于")
            return about;
        DeepX.MdBlogs.setElementProp("topmenu-stories", null, "故事");
        DeepX.MdBlogs.setElementProp("topmenu-games", null, "小游戏");
        return about;
    }
    PageCtrl.updateMenu = updateMenu;
    function getAuthors(book, refs, options) {
        var author = book === null || book === void 0 ? void 0 : book.author;
        if (!author)
            return [];
        if (typeof author === "string")
            author = [author];
        if (!refs)
            refs = [];
        return author.map(function (item) {
            if (!item)
                return undefined;
            if (typeof item === "string") {
                for (var i = 0; i < refs.length; i++) {
                    var ele = refs[i];
                    if (ele.name === item || DeepX.MdBlogs.getLocaleProp(ele, null, options) === item || ele.email === item)
                        return ele;
                }
                var pos = item.indexOf("@");
                if (pos < 0)
                    return { name: item };
                if (pos === 0)
                    return item.length > 1 ? { name: item.substring(1) } : undefined;
                var pos2 = item.indexOf(".", pos);
                return pos2 > 0 ? { name: item.substring(0, pos), email: item } : { name: item };
            }
            return item.name ? item : undefined;
        }).filter(function (item) { return item; });
    }
    PageCtrl.getAuthors = getAuthors;
})(PageCtrl || (PageCtrl = {}));
//# sourceMappingURL=current.js.map