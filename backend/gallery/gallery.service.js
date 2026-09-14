const gallery = [
    {
        id: 1,
        title: "프로필 촬영",
        category: "profile",
        imageUrl: "https://example.com/profile-01.jpg",
        order: 1,
    },
    {
        id: 2,
        title: "증명사진",
        category: "id",
        imageUrl: "https://example.com/id-01.jpg",
        order: 2,
    },
    {
        id: 3,
        title: "바디프로필",
        category: "body",
        imageUrl: "https://example.com/body-01.jpg",
        order: 3,
    },
];

const getGallery = () => {
    return gallery;
};

module.exports = {
    getGallery,
};