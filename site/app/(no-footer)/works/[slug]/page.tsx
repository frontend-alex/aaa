export default function Works({ params }: { params: { slug: string } }) {
    return (
        <div>
            <h1>Works {params.slug}</h1>
        </div>
    )
}