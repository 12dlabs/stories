function updateMenu() {
    const about = DeepX.MdBlogs.setElementText("topmenu-about", "about");
    if (about !== "关于") return about;
    DeepX.MdBlogs.setElementProp("topmenu-stories", null, "故事");
    DeepX.MdBlogs.setElementProp("topmenu-games", null, "小游戏");
    return about;
}

function initStories() {
    DeepX.MdBlogs.render("blog_content", "./config.json", {
        title: true,
        onselect(ev) {
            if (!ev) return;
            const article = ev.article;
            const model = ev.children;
            if (!article || !model) return;
            let insertion = 0;
            for (let i = 0; i < model.length; i++) {
                insertion++;
                if (model[i] && model[i].tagName === "main") break;
            }

            if (!article.data || !article.data.book) return;
            const books = (article.data.book instanceof Array ? article.data.book : [article.data.book]).map(function (book) {
                if (!book) return undefined;
                if (typeof book === "string") {
                }

                return undefined;
            }).filter(function (book) {
                return book;
            });
            if (books.length > 0) model.splice(insertion, 0, {
                tagName: "section",
                styleRefs: "x-part-blog-related",
                children: [{
                    tagName: "ul",
                    children: books
                }]
            });
        }
    });
    updateMenu();
}

function initHome() {
    const about = updateMenu();
    const title = {
        tagName: "h1",
        children: [{
            tagName: "a",
            props: {
                href: "./fairy-tales/"
            },
            children: about === "关于" ? "童话故事" : "Fairy Tales"
        }]
    };
    const context = Hje.render(document.getElementById("blog_content"), {
        children: [title, {
            tagName: "div",
            children: DeepX.MdBlogs.getLocaleString("loading")
        }]
    });
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