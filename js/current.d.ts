declare namespace PageCtrl {
    function home(): void;
}
declare namespace PageCtrl {
    interface IBookInfo {
        name?: string;
        year?: number;
        author?: string | (string | DeepX.MdBlogs.IContributorInfo)[];
    }
}
declare namespace PageCtrl {
    function stories(): void;
}
declare namespace PageCtrl {
    function updateMenu(): any;
    function getAuthors(book: IBookInfo, refs: DeepX.MdBlogs.IContributorInfo[]): DeepX.MdBlogs.IContributorInfo[];
}
