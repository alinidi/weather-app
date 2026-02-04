export const fetchApi = async <T>(url: string, options?: RequestInit): Promise<T> => {
    try {
        const isNominatim = url.includes('nominatim.openstreetmap.org');

        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(isNominatim
                    ? {
                          'User-Agent': 'WeatherApp/1.0',
                      }
                    : {}),
                ...options?.headers,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error, status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);

        return data as T;
    } catch (error) {
        console.log('Fetch API error: ', error);
        throw error;
    }
};
