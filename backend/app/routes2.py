# backend/app/routes.py

from flask import Blueprint, jsonify, request
from app.models import db, Todo

todos_bp = Blueprint('todos', __name__, url_prefix='/api/todos')

@todos_bp.route('', methods=['GET'])
def get_todos():
    todos = Todo.query.all()
    return jsonify([todo.to_dict() for todo in todos]), 200

@todos_bp.route('', methods=['POST'])
def create_todo():
    data = request.get_json()
    todo = Todo(text=data['text'], completed=data['completed'])
    db.session.add(todo)
    db.session.commit()
    return jsonify(todo.to_dict()), 201

@todos_bp.route('/<int:id>', methods=['GET'])
def get_todo(id):
    todo = Todo.query.get(id)
    if not todo:
        return jsonify({'error': 'Todo not found'}), 404
    return jsonify(todo.to_dict()), 200

@todos_bp.route('/<int:id>', methods=['PATCH'])
def update_todo(id):
    todo = Todo.query.get(id)
    if not todo:
        return jsonify({'error': 'Todo not found'}), 404
    data = request.get_json()
    todo.completed = data.get('completed', todo.completed)
    db.session.commit()
    return jsonify(todo.to_dict()), 200

@todos_bp.route('/<int:id>', methods=['DELETE'])
def delete_todo(id):
    todo = Todo.query.get(id)
    if not todo:
        return 
    db.session.delete(todo)
    db.session.commit()
    return jsonify({}), 204