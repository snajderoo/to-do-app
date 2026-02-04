function validateTodo(title, description) {
    if (!title.trim()) {
        return 'Tytuł nie może być pusty';
    }

    if (title.length > 50) {
        return 'Tytuł może mieć maksymalnie 50 znaków';
    }

    if (description.length > 200) {
        return 'Opis może mieć maksymalnie 200 znaków';
    }

    return '';
}
