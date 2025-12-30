namespace PageCtrl {

export function stories() {
    DeepX.MdBlogs.render("blog_content", "./config.json", {
        title: true,
        onselect(ev) {
            if (!ev) return;
            const article = ev.article;
            const model = ev.children;
            const localeOptions = ev.mkt == null ? undefined : { mkt: ev.mkt };
            if (!article || !model) return;
            const books = formatBooks(article.data?.book, ev.defs("books"));
            const allAuthorsRefs: DeepX.MdBlogs.IContributorInfo[] = ev.defs("contributors");
            if (books.length > 0) ev.insertChildren("end", {
                tagName: "section",
                styleRefs: "x-part-blog-related",
                children: [{
                    tagName: "ul",
                    styleRefs: "x-part-article-books",
                    children: books.map(book => {
                        const li: Hje.DescriptionContract[] = [{
                            tagName: "span",
                            children: DeepX.MdBlogs.getLocaleProp(book, null, localeOptions)
                        }];
                        if (book.year) li.push({
                            tagName: "span",
                            children: `(${book.year.toString()})`
                        });
                        const authors = getAuthors(book, allAuthorsRefs);
                        if (authors.length > 0) li.push(...authors.map(author => {
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
    updateMenu();
}

function formatBooks(books: IBookInfo | IBookInfo[], refs: IBookInfo[]) {
    if (!books) return [];
    if (!(books instanceof Array)) books = [books];
    if (!refs) return books;
    return books.map(book => {
        if (!book) return undefined;
        if (typeof book === "string") {
            return DeepX.MdBlogs.filterFirst(refs, item => {
                return !!(item && item.name && item.year && book === `${item.name}, ${item.year.toString(10)}`);
            })
        }

        return book.name && book.year ? book : undefined;
    }).filter(book => {
        return book;
    }) as IBookInfo[];
}

}
