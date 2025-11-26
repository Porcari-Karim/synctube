declare const messageRepository: import("mongodb").Collection<{
    roomId: import("mongodb").ObjectId;
    author: {
        username: string;
        passwordHash: string;
    };
    content: string;
    dateTime: Date;
}>;
export { messageRepository };
//# sourceMappingURL=message.repository.d.ts.map