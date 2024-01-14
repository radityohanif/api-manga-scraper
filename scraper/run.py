import requests
from pprint import pprint
from bs4 import BeautifulSoup

def komiku_get_all_image(url):
  response = requests.get(url)
  soup = BeautifulSoup(response.text, 'html.parser')
  images = soup.find_all('img', class_='klazy ww')
  result = []
  if images:
    for image in images:
      result.append(image['src'])
  return result

def komiku_get_manga_info(name):
  url = f'https://komiku.id/manga/{name}'
  response = requests.get(url)
  soup = BeautifulSoup(response.text, 'html.parser')

  info = {
    "judul": soup.find('p', class_='j2').text.strip(),
    "deskripsi": soup.find('p', class_='desc').text.strip(),
  }

  # mengambil link gambar thumbnail
  thumbnail = soup.find('div', class_='ims')
  thumbnail = thumbnail.find('img')
  thumbnail = thumbnail['src']
  info['thumbnail'] = thumbnail

  # mengambil list data genre
  genres = []
  genres_el = soup.find_all('li', class_='genre')
  for el in genres_el:
    genres.append(el.text.strip())
  info['genre'] = genres

  return info

def komiku_get_all_chapter(name):
  url = f'https://komiku.id/manga/{name}'
  response = requests.get(url)
  soup = BeautifulSoup(response.text, 'html.parser')
  
  chapter_list = []
  chapter_list_el = soup.find_all('td', class_='judulseries')

  for td in chapter_list_el:
    a = td.find('a')
    span = a.find('span')
    chapter_list.append({
      "href": a['href'],
      "label": span.text.strip()
    })

  return chapter_list