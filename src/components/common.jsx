export async function getServerSideProps(context) {
    const { req, resolvedUrl } = context;

    
    const currentUrl = resolvedUrl || req.url || '/';

    return {
        props: { currentUrl }, 
    };
}