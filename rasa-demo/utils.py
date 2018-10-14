import smtplib

from smtplib import SMTP
from decouple import config

host = "smtp.gmail.com"
port = 587
username = config("EMAIL_ID")
password = config("EMAIL_ID_PASSWORD")

_from = username

email_conn = SMTP(host, port)
email_conn.ehlo()
email_conn.starttls()

def send_mail(email):
	try:
		email_conn.login(username, password)
	except Exception as e:
		print("ERROR: " + e)

	try:
		email_conn.sendmail(_from, email, "Django Rasa ChatBot sends his regards...")
	except Exception as e:
		print("ERROR: " + e)


email_conn.quit()
