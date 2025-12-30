namespace PageCtrl {

export function home() {
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
    if (!context) return;
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

}
