import requests
import matplotlib.pyplot as plt

def fetch_data(url):
    response = requests.get(url)
    response.raise_for_status()
    return response.json()

def plot_entities(data):
    plt.figure(figsize=(10, 10))
    plt.title('Entities Plot with Lines')
    plt.xlabel('X Coordinates')
    plt.ylabel('Y Coordinates')

    for feature in data['features']:
        coordinates = feature['geometry']['coordinates']
        if feature['geometry']['type'] in ['LineString', 'MultiLineString']:
            x, y = zip(*coordinates)
            plt.plot(x, y, marker='o', label=feature['properties'].get('text', ''))
        else:
            x, y = zip(*coordinates) if isinstance(coordinates[0], tuple) else (coordinates[0], coordinates[1])
            plt.plot(x, y, 'ro')

    plt.legend()
    plt.grid()
    plt.show()

# Main execution
if __name__ == "__main__":
    url = 'http://0.0.0.0:8000/entities'
    try:
        data = fetch_data(url)
        plot_entities(data)
    except Exception as e:
        print(f"An error occurred: {e}")
