function updateMenu() {
    const about = DeepX.MdBlogs.setElementText("topmenu-about", "about");
    if (about !== "关于") return;
    DeepX.MdBlogs.setElementProp("topmenu-stories", null, "故事");
    DeepX.MdBlogs.setElementProp("topmenu-games", null, "小游戏");
}

function init(group) {
    DeepX.MdBlogs.render("blog_content", "./config.json", {
        title: true,
        onselect(ev) {
            if (!ev) return;
            const article = ev.article;
            const model = ev.children;
            if (!article || !model) return;
        }
    });
    updateMenu();
}

function initHome() {
    updateMenu();
    const title = {
        tagName: "h1",
        children: [{
            tagName: "a",
            props: {
                href: "./fairy-tales/"
            },
            children: "Fairy Tales"
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