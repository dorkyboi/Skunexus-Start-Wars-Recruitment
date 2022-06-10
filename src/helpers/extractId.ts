function extractId(data: string | {url: string}) {
    const url = typeof data === 'string' ? data : data.url;
    return url.split('/').at(url.endsWith('/') ? -2 : -1) || '';
}

export default extractId;
