# backend/app/routes.py

from flask import Blueprint, jsonify, request

todos = []
next_id = 1

todos_bp = Blueprint('todos', __name__, url_prefix='/api/todos')

@todos_bp.route('', methods=['GET'])
def get_todos():
    return jsonify(todos), 200

@todos_bp.route('', methods=['POST'])
def create_todo():
    global next_id
    data = request.get_json()
    todo = {
        'id': next_id,
        'text': data['text'] + 'im making sure the backend works',
        'completed': False,
    }
    todos.append(todo)
    next_id += 1
    return jsonify(todo), 201

@todos_bp.route('/<int:id>', methods=['GET'])
def get_todo(id):
    for todo in todos:
        if todo['id'] == id:
            return jsonify(todo), 200
    return jsonify({'error': 'Todo not found'}), 404

@todos_bp.route('/<int:id>', methods=['PATCH'])
def update_todo(id):
    data = request.get_json()
    for todo in todos:
        if todo['id'] == id:
            todo['completed'] = data.get('completed', todo['completed'])
            return jsonify(todo), 200
    return jsonify({'error': 'Todo not found'}), 404

@todos_bp.route('/<int:id>', methods=['DELETE'])
def delete_todo(id):
    for i in range(len(todos)):
        if todos[i]['id'] == id:
            del todos[i]
            return jsonify({}), 204
    return jsonify({'error': 'Todo not found'}), 404
