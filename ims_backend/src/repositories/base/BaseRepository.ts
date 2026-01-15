import { Model, Document } from 'mongoose';

export abstract class BaseRepository<TDomain, TDoc extends Document> {
    protected constructor(
        protected readonly model: any // Model<TDoc>
    ) {}

    protected abstract mapToDomain(doc: TDoc): TDomain;

    async create(payload: Partial<TDoc>): Promise<TDomain> {
        const doc = await this.model.create(payload);
        return this.mapToDomain(doc);
    }

    async findById(id: string): Promise<TDomain | null> {
        const doc = await this.model.findById(id);
        if (!doc) return null;
        return this.mapToDomain(doc);
    }

    async findAll(): Promise<TDomain[]> {
        const docs: TDoc[] = await this.model.find();
        return docs.map((d: TDoc) => this.mapToDomain(d));
    }

    async updateById(
        id: string,
        payload: Partial<TDoc>
    ): Promise<TDomain | null> {
        const doc = await this.model.findByIdAndUpdate(
            id,
            { $set: payload },
            { new: true }
        );
        if (!doc) return null;
        return this.mapToDomain(doc);
    }

    async deleteById(id: string): Promise<boolean> {
        const deleted = await this.model.findByIdAndDelete(id);
        return !!deleted;
    }

    async count(filter: object = {}): Promise<number> {
        return this.model.countDocuments(filter);
    }
}
