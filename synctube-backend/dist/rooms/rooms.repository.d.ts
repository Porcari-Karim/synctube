declare const roomRepository: import("mongodb").Collection<{
    title: string;
    participants: number;
    youtubeVideoUrl: string;
    videoState: {
        state: "playing" | "paused";
        time: number;
        updatedAt: number;
    };
    owner: {
        username: string;
    };
}>;
export { roomRepository };
//# sourceMappingURL=rooms.repository.d.ts.map