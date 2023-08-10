FROM python:3.11-slim-buster

WORKDIR /ElectroStock

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

RUN python manage.py makemigrations
RUN python manage.py migrate

EXPOSE 8000

CMD ["python3", "manage.py", "runserver","0.0.0.0:8000"]