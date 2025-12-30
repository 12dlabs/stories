namespace PageCtrl {

export interface IBookInfo {
    name?: string;
    year?: number;
    author?: string | (string | DeepX.MdBlogs.IContributorInfo)[];
}

}