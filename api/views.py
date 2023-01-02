from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serializers import NoteSerializer

# Create your views here.
@api_view(['GET'])
def getRoutes(request):

    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]

    return Response(routes)


@api_view(['GET'])
def getNotes(request):
    notes = Note.objects.all().order_by('-updated')
    Serializer = NoteSerializer(notes, many=True)
    return Response(Serializer.data)

@api_view(['GET'])
def getNote(request, key):
    notes = Note.objects.get(id=key)
    Serializer = NoteSerializer(notes, many=False)
    return Response(Serializer.data)

@api_view(['POST'])
def createNote(request):
    data=request.data
    note=Note.objects.create(
        body=data['body']
    )
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def updateNote(request, key):
    data = request.data
    note = Note.objects.get(id=key)
    Serializer = NoteSerializer(instance=note, data=data)

    if Serializer.is_valid():
        Serializer.save()

    return Response(Serializer.data)


@api_view(['DELETE'])
def deleteNote(request, key):
    note = Note.objects.get(id = key)
    note.delete()
    return Response("Note deleted successfully")