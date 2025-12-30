namespace PageCtrl {

export function updateMenu() {
    const about = DeepX.MdBlogs.setElementText("topmenu-about", "about");
    if (about !== "关于") return about;
    DeepX.MdBlogs.setElementProp("topmenu-stories", null, "故事");
    DeepX.MdBlogs.setElementProp("topmenu-games", null, "小游戏");
    return about;
}

export function getAuthors(book: IBookInfo, refs: DeepX.MdBlogs.IContributorInfo[]) {
    let author = book?.author;
    if (!author) return [];
    if (typeof author === "string") author = [author];
    if (!refs) refs = [];
    return author.map(item => {
        if (!item) return undefined;
        if (typeof item === "string") {
            for (let i = 0; i < refs.length; i++) {
                const ele = refs[i];
                if (ele.name === item || DeepX.MdBlogs.getLocaleProp(ele) === item || ele.email === item) return ele;
            }

            const pos = item.indexOf("@");
            if (pos < 0) return { name: item };
            if (pos === 0) return item.length > 1 ? { name: item.substring(1) } : undefined;
            const pos2 = item.indexOf(".", pos);
            return pos2 > 0 ? { name: item.substring(0, pos), email: item } : { name: item };
        }

        return item.name ? item : undefined;
    }).filter(item => item) as DeepX.MdBlogs.IContributorInfo[];
}

}
