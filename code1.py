import requests
from bs4 import BeautifulSoup
response=requests.get("https://www.magicbricks.com/owner-property-for-sale-in-new-delhi-pppfs")
soup=BeautifulSoup(response.content,"html.parser")
card=soup.find("div",attrs={"class":"mb-srp__card"})
cards=soup.find_all("div",attrs={"class":"mb-srp__card"})
for card in cards:
    card_container=card.find("div",attrs={"class":"mb-srp__card__container "})
    card_info=card_container.find("div",attrs={"class":"mb-srp__card__info"})
    card_estimate=card_container.find("div",attrs={"class":"mb-srp__card__estimate "})
    title=card_info.find("h2",attrs={"class":"mb-srp__card--title"})
    price=card_estimate.find("div",attrs={"class":"mb-srp__card__price--amount"})
    price_size=card_estimate.find("div",attrs={"class":"mb-srp__card__price--size"})

    data="{} {} {}".format(title.text,price_size,price.text)
    print(data)