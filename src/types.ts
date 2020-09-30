export type Page = {
    page: {
        total_count: number;
    };
};

export type Result<T> = Promise<{ success: boolean } & T>;
