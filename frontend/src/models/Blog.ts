export interface BlogProps {
    createdAt: string;
    description: string;
    images: string;
    postId: string;
    title: string;
    updatedAt: string;
    user: {
        name: string;
        userName: string;
        email: string;
    };
    userId: string;
}

export interface BlogCardProps {
    blogId: string;
    name: string;
    userName: string;
    title: string;
    description: string;
    image?: string;
    createdAt: string;
}

export interface BlogContent {
    title: string;
    description: string;
}

export interface BlogContextType {
    isDeleted: boolean;
    setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
    isUpdated: boolean;
    setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}