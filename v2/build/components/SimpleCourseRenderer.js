export class SimpleCourseRenderer {
    constructor(options = {}) {
        this.options = options;
    }

    async renderCourse(moduleData, containerId = 'courseContent') {
        const container = document.getElementById(containerId);
        if (!container) throw new Error('Container not found');
        
        const html = this.generateCourseHTML(moduleData);
        container.innerHTML = html;
        return html;
    }

    generateCourseHTML(data) {
        return '<div class="course">' + this.sanitize(data.titre || 'Cours') + '</div>';
    }

    sanitize(content) {
        return String(content || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    sanitizeHTML(content) {
        return this.sanitize(content);
    }
}
